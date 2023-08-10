import Joi from 'joi';
export const createCatagory = async (data: any) => {
    const catagorySchema = Joi.object().keys({
        name: Joi.string().min(3).max(40).required(),
    });

    return catagorySchema.validate(data)

}