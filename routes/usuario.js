import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js"
const router = Router()
import { logado } from "../config/regras.js";

router.get('/login', (req, res) => res.render('usuario/login'))
router.post('/login', UsuarioController.login)
router.get('/logout', logado, UsuarioController.logout)
router.get('/cadastrar', (req, res) => {
    if (req.user?.tipo == 0) {
        res.render('usuario/cadastrar')
    } else {
        res.render('errors/401')
    }
})
router.post('/cadastrar', UsuarioController.cadastrar)

router.get('/usuarios', logado, UsuarioController.listarUsuarios)

router.get('/usuario', UsuarioController.getUsuario)
router.post('/atualizar/:id', UsuarioController.atualizarUsuario)
router.get('/deletar/:id', UsuarioController.excluirUsuario)

export default router
