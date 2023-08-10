import { IComment } from '../interfaces/comment.interface';
import commentModel from '../models/comment.model';



/**
 *
 *
 * @export
 * @class CommentService
 */
export default class CommentService {

    /**
     * Create a new comment
     * @param data
     */
    public async create(data: IComment) {

        let comment = await commentModel.create(data);
        return comment;

    }


    /**
     * Get all comments
     * @param 
     */
    public async getallComments(query: any) {
        const page = Number(query.pageNumber) || 1;
        const pageSize = Number(query.pageSize) || 10;
        let comments = await commentModel.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        return comments;

    }


    /**
     * Get single comment
     * @param id
     */
    public async getComment(id: string) {
        let comment = await commentModel.findOne({ _id: id });
        if (!comment) return null;
        return comment;

    }

}