import { Router } from 'express';
import { verifyAdmin } from '../middlewares/jwt';
import SliderController from '../controllers/slider.controller';
import { uploadSingle } from '../middlewares/storage';


const SliderRoute = Router();
const controller = new SliderController();

/** 
 * create social-media
 * admin can perform this action
 * 
 */
SliderRoute.post("/",verifyAdmin,uploadSingle, controller.createSlider);


/** 
 * get all sliders
 * any user can perform this action
 * 
 */
SliderRoute.get("/", controller.getAllsliders);


/** 
 * get slider
 * admin can perform this action
 * 
 */
SliderRoute.get("/:id",verifyAdmin, controller.getSlider);


/** 
 * delete slider
 * admin can perform this action
 * 
 */
SliderRoute.delete("/:id",verifyAdmin, controller.deleteSlider);


/** 
 * update slider
 * only admin can perform this action
 * 
 */
SliderRoute.patch("/",verifyAdmin,uploadSingle, controller.updateSlider);


export default SliderRoute;