import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import auth from './config/auth.js'
import categoriaUsuario from './utils/categoriaUsuario.js';
auth(passport)

//CONFIGURAR O TEMPLATE PADRÃO
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'principal',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

//CONFIGURAR O BODY PARSER PARA ENVIAR DADOS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configurações do passport
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Variáveis globais
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash('error')
  res.locals.usuario = req.user || null
  res.locals.categoriaUsuario = categoriaUsuario[res.locals.usuario?.tipo]
  next()
})

//Pasta de Arquivos Estásticos
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'))


///ROTAS DO SISTEMA
import usuario from "./routes/usuario.js"
app.use('/usuario', usuario)

import sala from './routes/sala.js'
app.use('/', sala)
app.use('/sala', sala)

app.use('/', (req, res) => {
  if (req?.user?.tipo == 0) {
    res.render('admin/index')
  } else {
    res.redirect('/sala/index')
  }
})

import reserva from './routes/reserva.js';
app.use('/reserva', reserva)

app.listen(5000, () => console.log('Servidor Rodando em http://localhost:5000'))
