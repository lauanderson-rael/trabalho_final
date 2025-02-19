import { Router } from "express";
import ReservaController from '../controllers/ReservaController.js'

const router = Router()

router.get('/', ReservaController.index)

export default router
