import { Router } from "express";
import SalaController from "../controllers/SalaController.js"
const router = Router()

router.get('/index', SalaController.index)
export default router