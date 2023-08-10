import Joi from 'joi';
export const createComment = async (data: any) => {
    const commentSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        website: Joi.string().allow(""),
        text: Joi.string().min(1).required(),
       
    });

    return commentSchema.validate(data)

}