import { Router } from "express";
import ReservaController from '../controllers/ReservaController.js'

const router = Router()

router.get('/', ReservaController.index)
router.get('/reserva', ReservaController.criarReserva)

export default router
