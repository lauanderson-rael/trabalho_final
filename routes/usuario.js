import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js"
const router = Router()

router.get('/login', (req, res) =>  res.render('usuario/login'))
router.post('/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)
router.get('/cadastrar', (req, res) =>  res.render('usuario/cadastrar'))
router.post('/cadastrar', UsuarioController.cadastrar)

export default router