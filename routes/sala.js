import { Router } from "express";
import SalaController from "../controllers/SalaController.js"
const router = Router()

router.get('/', SalaController.index)
router.post('/salvar', SalaController.salvar)
router.get('/cadastrar', (req, res) => {
    if (req.user?.tipo == 0) {
        res.render('sala/cadastrar')
    } else {
        res.render('errors/401')
    }
})
// router.get('/cadastrar', (req, res) => {
//     res.render('sala/cadastrar')
// })

export default router
