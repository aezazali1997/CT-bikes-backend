import mongoose, { model, Schema, Document } from 'mongoose';
import { UserRole } from '../types/user';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';


const userSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        company_name: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street_address: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true

        },
        email_address: {
            type: String,
            required: true,
            unique: true
        },
        phone_number: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            enum: [
                UserRole.User,
                UserRole.Admin,
            ],
            default: UserRole.User
        },
        password: {
            type: String,
            required: true
        },
        password_token:{
            type :String,
            default:""
        }



    },
    {
        timestamps: true,
    },
);

// function to check of passwords are matching
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    // console.log("===>",await bcrypt.compare(enteredPassword,this.password));
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
  * Implement to JSON
  */
userSchema.methods.toJSON = function () {
    const obj: any = this.toObject();
    delete obj.password;
    delete obj.password_token;
    delete obj.token;
    delete obj.role,
    delete obj.createdAt,
    delete obj.updatedAt,
    delete obj.__v,
    delete obj._id,
    delete obj.otp;
    return obj;
};


// encrypt password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});



const userModel = model<IUser>('User', userSchema);
export default userModel;