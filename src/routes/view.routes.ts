import { ViewController } from '../controllers/view.controller'
import { Router } from 'express'

export const viewRouter = Router();
const viewController = new ViewController()
viewRouter.get('/', viewController.addView)
viewRouter.get('/daily-views', viewController.getViews)
