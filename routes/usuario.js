import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js"
const router = Router()

router.get('/login', (req, res) => res.render('usuario/login'))
router.post('/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)
router.get('/cadastrar', (req, res) => {
    if (req.user?.tipo == 0) {
        res.render('usuario/cadastrar')
    } else {
        res.render('errors/401')
    }
})
router.post('/cadastrar', UsuarioController.cadastrar)

router.get('/usuarios', UsuarioController.listarUsuarios)

export default router
