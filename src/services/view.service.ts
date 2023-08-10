import { HttpMessage } from '../exceptions/errorMessages';
import { IView } from '../interfaces/view.interface';
import viewModel from '../models/view.model';


/**
 *
 *
 * @export
 * @class ViewService
 */
export default class ViewService {

    /**
     * Create View
     * @param data
     */
    public async addView(data: number) {
        let device = "desktop"
        switch (data) {
            case 1: {
                device = 'mobile';
                break;
            }
            case 2: {
                device = 'tablet';
                break;
            }
        }
        await viewModel.create({
            device
        })


    }

    /**
     * Get View
     * @param data
     */
    public async view() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const dailyViews = await viewModel.find({
            createdAt: {
                $gte: todayStart,
                $lte: todayEnd
            }
        });

        if (dailyViews.length > 0) {
            return dailyViews.length;
        } else {
            return {
                dailyViews: { totalViews: 0 }
            }

        }
    }
}