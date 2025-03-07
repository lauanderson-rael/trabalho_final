import Usuario from '../models/Usuario.js';
import passport from 'passport';
import bcrypt from 'bcryptjs'
import categoriaUsuario from '../utils/categoriaUsuario.js';

class UsuarioController{

    login = (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/usuario/login',
            failureFlash: true,
            failureMessage: 'Usuário não autenticado! Tente novamente!',
            successMessage: 'Usuário logado com sucesso!'
        })(req, res, next)
    }

    logout = (req, res, next) => {
        req.logout(function(erro){
            res.locals.usuario = null
            res.redirect('/usuario/login')
        })
    }

    cadastrar = async (req, res) => {
      let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        tipo: req.body.tipo
      }

      let find_usuario = await Usuario.findOne({ where: { email: usuario.email } });

      if(find_usuario) {
        req.flash('error_msg', 'Já existe um usuário cadastrado com esse e-mail!')
        res.redirect('/usuario/cadastrar') 
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


    getUsuario = async (req, res) => {
      let id = req.query.id
      let usuario = await Usuario.findByPk(id)
      res.render('usuario/usuario', { usuario: usuario})
    }

    dadosUsuario = async (req, res) => {
      let id = req.params.id
      let usuario = await Usuario.findByPk(id)
      res.render('usuario/dados', { usuario: usuario})
    }

    atualizarUsuario = async (req, res) => {
      let id = req.params.id
      let { nome, email, senha, tipo } = req.body;
      let usuario = await Usuario.findByPk(id)
      if (!usuario) {
        return res.send('Usuário não encontrado');
      }
      Usuario.update({ nome, email, senha, tipo }, { where: { id } })
      res.redirect('/usuario/usuarios');
    }

    listarUsuarios = async (req, res) => {
      let usuarios = await Usuario.findAll()
      res.render('usuario/usuarios', { usuarios: usuarios, categoriaUsuario: categoriaUsuario })
    }

    excluirUsuario = async (req, res) => {
      let id = req.params.id;
      let usuario = await Usuario.findByPk(id);
      console.log(usuario)

      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      await Usuario.destroy({ where: { id } });
      res.redirect('/usuario/usuarios');
    }
}

export default new UsuarioController()