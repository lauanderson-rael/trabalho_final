import { Router } from "express";
import SalaController from "../controllers/SalaController.js"
const router = Router()

router.get('/', SalaController.index)
export default router