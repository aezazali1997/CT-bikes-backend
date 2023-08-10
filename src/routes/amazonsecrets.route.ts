import { Router } from 'express';
import { verifyAdmin, verifyUser } from '../middlewares/jwt';
import AmazonSecretsController from '../controllers/amazonsecrets.controller';


const AmazonSecretsRouter = Router();
const AmazonSecretController = new AmazonSecretsController();
/** 
 * Get Amazon secrets
 * admin can perform this action
 * 
 */
AmazonSecretsRouter.get("/", verifyAdmin, AmazonSecretController.getSecrets);

/** 
 * create Amazon secrets
 * admin can perform this action
 * 
 */
AmazonSecretsRouter.post("/", verifyAdmin, AmazonSecretController.addSecret);


/* Delete a Amazon Secret */

AmazonSecretsRouter.delete("/:id", verifyAdmin, AmazonSecretController.deleteSecret);





export default AmazonSecretsRouter;