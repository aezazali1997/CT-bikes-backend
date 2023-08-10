import { HttpMessage } from '../exceptions/errorMessages';
import { IUser } from '../interfaces/user.interface';
import userModel from '../models/user.model';


/**
 *
 *
 * @export
 * @class UserService
 */
export default class UserService {

    /**
     * Create account
     * @param data
     */
    public async signup(data: IUser) {

        let user = await userModel.create({ ...data });
        return user;

    }



    /**
        * Find user by email
        * @param data
        */
    public async findByEmail(email: string) {

        let user: IUser | null = await userModel.findOne({ email_address: email });
        return user;

    }
    public async updateUserProfile(id: string, data: any) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                { _id: id },
                data,
                { new: true } // This option returns the updated document
            );

            return updatedUser;
        } catch (error) {
            // Handle any errors that may occur during the update process
            console.error('Error updating user profile:', error);
            return null;
        }
    }


}