import Usuario from '../models/Usuario.js';
import passport from 'passport';
import bcrypt from 'bcryptjs'

class UsuarioController{

    login = (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout(function(erro){
            res.locals.usuario = null
            res.redirect('/usuario/login')
        })
    }

    cadastrar = (req, res) => {
      let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        tipo: 1
      }

      bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(usuario.senha, salt, (erro, hash) => {
          if(erro){
            req.flash('error_msg', 'erro ao salvar usuário!')
            res.redirect('/usuario/cadastrar')
          }
          usuario.senha = hash

          Usuario.create(usuario).then(()=> {
            req.flash('success_msg', 'Usuário cadastrado com sucesso!')
            res.redirect('/')
          }).catch(function (error) {
            req.flash('error_msg', error.message)
          })
        })
      })
    }

    listarUsuarios = async (req, res) => {
      let usuarios = await Usuario.findAll()
      res.render('usuario/usuarios', { usuarios: usuarios })
    }


}

export default new UsuarioController()