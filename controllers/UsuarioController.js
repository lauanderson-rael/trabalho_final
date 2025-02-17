import Usuario from "../models/Usuario.js"
import passport from 'passport'

class UsuarioController {
    login = (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/usuario/login',
            failureMessage: true
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout(function(erro){
            res.redirect('/usuario/login')
        })
    }
}