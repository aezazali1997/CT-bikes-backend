import { Router } from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import PaypalSecretsControlller from '../controllers/paypalsecrets.controller';


const PayPalSecretsRouter = Router();
const EbaySecretController = new PaypalSecretsControlller();
/** 
 * Get Ebay secrets
 * admin can perform this action
 * 
 */
PayPalSecretsRouter.get("/", verifyAdmin, EbaySecretController.getSecrets);

/** 
 * create Ebay secrets
 * admin can perform this action
 * 
 */
PayPalSecretsRouter.post("/", verifyAdmin, EbaySecretController.addSecret);


/* Delete a Ebay Secret */

PayPalSecretsRouter.delete("/:id", verifyAdmin, EbaySecretController.deleteSecret);





export default PayPalSecretsRouter;