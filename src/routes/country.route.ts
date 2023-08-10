import { Router } from 'express';
import CountryController from '../controllers/country.controller';
import { verifyAdmin } from '../middlewares/jwt';


const CountryRoute = Router();
const controller = new CountryController();

/** 
 * create a country
 * only admin can perform this action
 * 
 */
CountryRoute.post("/",verifyAdmin, controller.create);

/** 
 * get all countries
 * any user can perform this action
 * 
 */
CountryRoute.get("/", controller.getallCountries);

/** 
 * get a country
 * any user can perform this action
 * 
 */
CountryRoute.get("/:identifier", controller.getCountry);

/** 
 * delete a country
 * only admin can perform this action
 * later we will add authencation layer on this route
 */
CountryRoute.delete("/:id",verifyAdmin, controller.deleteCountry);

/** 
 * update a country
 * only admin can perform this action
 * later we will add authencation layer on this route
 */
CountryRoute.put("/",verifyAdmin, controller.updateCountry);






export default CountryRoute;