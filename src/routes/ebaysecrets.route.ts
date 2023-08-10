import { Router } from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import EbaySecretsController from '../controllers/ebaysecrets.controller';


const EbaySecretsRouter = Router();
const EbaySecretController = new EbaySecretsController();
/** 
 * Get Ebay secrets
 * admin can perform this action
 * 
 */
EbaySecretsRouter.get("/", verifyAdmin, EbaySecretController.getSecrets);

/** 
 * create Ebay secrets
 * admin can perform this action
 * 
 */
EbaySecretsRouter.post("/", verifyAdmin, EbaySecretController.addSecret);


/* Delete a Ebay Secret */

EbaySecretsRouter.delete("/:id", verifyAdmin, EbaySecretController.deleteSecret);





export default EbaySecretsRouter;