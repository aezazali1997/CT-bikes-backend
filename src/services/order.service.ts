import orderModel from '../models/order.model';
import { Order } from '../types/order';
import { HttpMessage } from '../exceptions/errorMessages';
import { sendEmailOrder } from './mail.service';
import { IOrder } from '../interfaces/order.interface';

/**
 *
 *
 * @export
 * @class Orderservice
 */
export default class Orderservice {

    /**
     * Create a new order
     * @param data
     */
    public async create(data: any) {

        let order = await orderModel.create({ ...data });
        return order;

    }


    /**
     * Get all Orders for a user
     * @param 
     */
    public async getallOrders(query: any, userId: string) {
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 10; // the total number of entries on a single page
        let orders = await orderModel.find({ user: userId })
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        return orders;

    }



    /**
     * Get single order
     * @param 
     */
    public async getOrder(orderId: string) {
        let order = await orderModel.findById({ _id: orderId });
        if (!order) return null;
        return order;

    }


    /**
    * Update order by user
    * @param data
    */
    public async updateOrderUser(data: any, orderId: string) {
        let order = await orderModel.findOne({ _id: orderId });
        if (!order) return null;


        // user can update order status to canel if not shipped
        if (data.status == Order.Cancelled) {
            if (order.status == Order.Not_processed || order.status == Order.Created || order.status == Order.Processing) {
                order.status = Order.Cancelled;
            } else {
                return HttpMessage.CANNAT_UPDATE;
            }

        }
        // updating other variables if passed from body

        // #TODO ASK FROM ABBAS BAI CAN USER UPDATE HIS ORDER AFTER PLACING

        // for (const key of Object.keys(data)) {
        //     if (data[key]) {
        //         order[key] = data[key]
        //     }
        // }
        // await order.save();
        return order;
    }



    /**
    * Update order by admin
    * @param data
    */
    public async updateOrderAdmin(id: string, data: any) {

        if (data.status) {
            if (![1, 2, 3, 4, 5, 6].includes(Number(data.status))) {
                return HttpMessage.BAD_REQUEST;
            }
        }
        let order: any = await orderModel.findById({ _id: id });
        if (!order) return HttpMessage.NOT_FOUND;
        let oldStatus = order?.status;
        //#TODO what kind of propertites an admin can update
        order = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: data,
            },
            { new: true }
        )

        // here we will check if status updated we will send mail to user
        if (oldStatus !== order?.status) {
            await sendEmailOrder(order);

        }
        return order;
    }


    getAllOrdersCount = async (startDate: string | undefined, endDate: string | undefined) => {
        let query: any = {};

        // If both start and end dates are provided, apply date range filter
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const totalOrdersCount = await orderModel.countDocuments(query);
        return totalOrdersCount;

    }
    /**
    * Get orders based on status/createdAt/isPaid
    * @param data
    */
    public async getAllOrdersAdmin(query: any) {
        let orders;
        const page = Number(query.pageNumber) || 1; // the current page number being fetched
        const pageSize = Number(query.pageSize) || 20; // the total number of entries on a single page
        if (query.creatAt) {
            orders = await orderModel.find().sort({ createdAt: -1 })
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        }
        else if (query.status) {
            orders = await orderModel.find({ status: query.status })
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        } else if (query.isPaid) {
            orders = await orderModel.find({ isPaid: query.isPaid })
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        } else {
            orders = await orderModel.find()
                .limit(pageSize)
                .skip(pageSize * (page - 1));
        }
        return orders;
    }
    public getAllPendingOrdersCount = async (startDate: string | undefined, endDate: string | undefined) => {
        let query: any = { status: 'Not_processed' };

        // If both start and end dates are provided, apply date range filter
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const totalOrders = await orderModel.find(query);
        return totalOrders.length;
    }

    public getAverageDailySales = async (startDate: Date, endDate: Date) => {
        const orders: IOrder[] = await orderModel.find({
            createdAt: { $gte: startDate, $lt: endDate },
            status: { $eq: Order.Delivered }
        });
        return orders.reduce((prevTotal: number, order: IOrder) => {
            return prevTotal + order.subtotal;
        }, 0)
    }
    public totalEarnings = async (startDate: string | undefined, endDate: string | undefined) => {
        let query: any = { isPaid: true };

        // If both start and end dates are provided, apply date range filter
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const orders: IOrder[] = await orderModel.find(query);
        const totalEarnings = orders.reduce((total: number, order: IOrder) => {
            return total + order.subtotal;
        }, 0);

        return totalEarnings;
    }
    public revenueProfit = async (year: string) => {


        const data = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $type: "date" } // Filters out documents with invalid createdAt values
                }
            },
            {
                $addFields: {
                    createdAtDate: { $toDate: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAtDate" },
                        month: { $month: "$createdAtDate" },
                    },
                    totalRevenue: { $sum: "$subtotal" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        const formattedRevenueData = data.map(entry => ({
            month: `${entry._id.year}-${entry._id.month}`,
            totalRevenue: entry.totalRevenue
        }));
        return formattedRevenueData;

    }

}