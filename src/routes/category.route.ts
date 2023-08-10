import { Router } from 'express';
import CatagoryController from '../controllers/category.controller';
import { verifyAdmin } from '../middlewares/jwt';



const CategoryRoute = Router();
const controller = new CatagoryController();

/** 
 * create a category
 * only admin can perform this action
 * 
 */
CategoryRoute.post("/", verifyAdmin, controller.create);


/** 
 * get all category
 * any user can perform this action
 * 
 */
CategoryRoute.get("/", controller.getallCategories);

/** 
 * get a category
 * any user can perform this action
 * 
 */
CategoryRoute.get("/:id", controller.getCategory);

/** 
 * delete a category
 * only admin can perform this action
 * 
 */
CategoryRoute.delete("/:id", verifyAdmin, controller.deleteCategory);

/** 
 * update a category
 * only admin can perform this action
 * later we will add authencation layer on this route
 */
CategoryRoute.put("/", verifyAdmin, controller.updateCategory);






export default CategoryRoute;