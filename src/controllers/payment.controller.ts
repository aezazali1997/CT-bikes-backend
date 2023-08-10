import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { HttpCode } from '../exceptions/HttpStatus';
import { HttpMessage } from '../exceptions/errorMessages';
import paypal from 'paypal-rest-sdk';
import paymentModel from '../models/payment.model';
import orderModel from '../models/order.model';
import { Order } from '../types/order';
import { CLIENT_ID, CLIENT_SECRET, PAYMENT_MODE } from '../config';
import { sendEmailOrder } from '../services/mail.service';
import productModel from '../models/product.model';
//console.log(CLIENT_ID ==="Ab8VKlcbFNsGHK6GMSnvMXGi5i75rw_n6Ur-mlqavjAEn6W-saLkBJZvqTQxUcxaR-EBvI0G_9W5oCpi")
//console.log(CLIENT_SECRET ==="EHqps5F3HwZxXLIPaYcoRYsyGgBHQdCZaGxENlIMqYtJAqBEwubOZfhz91r7ZJlh252xK8WGm1hrnuSH")

// paypal.configure({
//     mode: "sandbox",
//     client_id: "Ab8VKlcbFNsGHK6GMSnvMXGi5i75rw_n6Ur-mlqavjAEn6W-saLkBJZvqTQxUcxaR-EBvI0G_9W5oCpi" || `${CLIENT_ID}`,
//     client_secret: "EHqps5F3HwZxXLIPaYcoRYsyGgBHQdCZaGxENlIMqYtJAqBEwubOZfhz91r7ZJlh252xK8WGm1hrnuSH" || `${CLIENT_ID}`,

// });
paypal.configure({
    mode: "sandbox",
    client_id: `${CLIENT_ID}`,
    client_secret: `${CLIENT_SECRET}`,

});

class PaymentController {


    /**
     * Create a new payment
     * @param req
     * @param res
     * @param next
     */
    public createPayment = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const order: any = await orderModel.findById({ _id: req.params.orderId });
            // passing user id in query for testing in postman
            // using browser we will use moddileware and get req.user
            //  if (!order || req.query.user !== order.user.toString())
            if (!order || String(req.user._id) !== String(order.user))
                return next(new HttpException(HttpCode.NOT_FOUND, "Order not found."));
            if (order.isPaid == true)
                return next(new HttpException(HttpCode.BAD_REQUEST, "Order already paid"));
            //const user = req.user;

            let itemList = order.items.map((product: any) => {
                return {
                    title: product.title,
                    productId: product.productId,
                    main_image: product.main_image,
                    quantity: product.quantity,
                    price: product.price,
                    item_subtotal: product.item_subtotal,
                    currency: order.currency
                }
            });

            // const totalAmount = itemList.reduce((total: any, item: any) => total + (item.quantity * item.price), 0);
            const user = req.query.user;
            let create_payment_json: any = {
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    return_url: "http://localhost:8000/api/v1/payment/success",
                    cancel_url: "http://localhost:8000/api/v1/payment/cancel"
                },
                transactions: [{
                    /* as items already added to order so we don,t want to add again to payment doc
                    "item_list": {
                        "items": order.items.map((item: any) => {
                            return {
                                "name": item.name,
                                // "sku": item.sku ,
                                "price": item.price,
                                "currency": order.currency,
                                "quantity": item.quantity,
                                "image_url": item.image_image_url
                            };
                        })
                    },*/
                    amount: {
                        currency: order.currency as string, // will change to pound later
                        total: order.subtotal as number
                    },
                    description: order.order_notes || `Order by ${order.first_name} ${order.last_name} `
                    //description: "this is testing order" || order.order_notes
                }]
            }

            paypal.payment.create(create_payment_json, async function (error, payment) {
                if (error) {
                    console.log(error)
                    return res.status(400).json({
                        errorName: error.response.name,
                        details: error.response.details

                    });
                } else {
                    if (payment.links && payment.links.length) {
                        for (let i = 0; i < payment.links.length; i++) {
                            if (payment.links[i].rel === 'approval_url') {
                                //res.redirect(payment.links[i].href);
                                res.json({ forwardLink: payment.links[i].href });
                            }
                        }

                        // update order propertities
                        order.paymentId = payment.id;
                        // order.subtotal = totalAmount;
                        await order.save();

                    } else {
                        return next(new HttpException(HttpCode.BAD_REQUEST, "Payment links not found"));
                    }
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR} ` });
        }
    };




    /**
     * Success payment
     * @param req
     * @param res
     * @param next
     */
    public successPayment = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {

            // upon redirect to success page will call this route with
            // payerid and paymentId

            const payerId = req.query.PayerID as string;
            const paymentId = req.query.paymentId as string;

            let order: any = await orderModel.findOne({ paymentId: paymentId });
            if (!order) {
                return res.status(404).json({
                    message: `order not found`,
                });
            }

            const { currency, subtotal } = order;

            const execute_payment_json = {
                "payer_id": payerId,
                "transactions": [
                    {
                        "amount": {
                            "currency": currency,
                            "total": subtotal
                        }
                    }
                ]
            };

            // Obtains the transaction details from paypal
            paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment: any) {
                //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
                if (error) {
                    return res.status(400).json({
                        errorName: error.response.name,
                        details: error.response.details
                    });
                } else {
                    // update order
                    order.isPaid = true;
                    order.status = Order.Created;
                    // decrease product availablity in stock
                    // Decrease product quantities in database
                    for (const item of order.items) {
                        const product = await productModel.findById(item.productId);
                        if (product && product.quantity_in_stock > 0) {
                            product.quantity_in_stock -= item.quantity;
                            await product.save();
                        }
                    }
                    await order.save();

                    let Payment = {
                        orderId: order._id,
                        paymentId: payment.id,
                        status: payment.state,
                        subtotal: order.subtotal,
                        currency: order.currency,
                        /*
                        items: order.items.map((item: any) => {
                            return {
                                "name": item.name,
                                // "sku": item.sku ,
                                "price": item.price,
                                "currency": order.currency,
                                "quantity": item.quantity

                            };
                        }),
                        */
                        payment_method: payment.payer?.payment_method,
                        payer_email: payment.payer?.payer_info?.email,
                        payer_firstName: payment.payer?.payer_info?.first_name,
                        payer_lastName: payment.payer?.payer_info?.last_name,
                    }
                    await paymentModel.create(Payment);


                    // will send a mail to user
                    await sendEmailOrder(order);

                    // after adding frontend url we will remove this
                    return res.json({
                        message: `order payment done`,
                        // payment,
                    });
                }
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR} ` })

        }
    };


    /**
    * cancel payment
    * @param req
    * @param res
    * @param next
    */
    public cancelPayment = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            return res.json({
                message: `payment canceled..`,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || `${HttpMessage.INTERNAL_SERVER_ERROR} ` })

        }
    };

}

export default PaymentController;

