import passportLocal from 'passport-local'
const localEstrategy = passportLocal.Strategy
import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs'

export default function(passport){
    passport.use(new localEstrategy(
        {usernameField: 'email', passwordField: 'password'},
        function(email, password, done){
            Usuario.findOne({
                where:{
                    email: email
                }
            }).then(function(usuario){
                if(!usuario){
                    console.log(usuario)
                    return done(null, false, {message: 'Usuário não encontrado'})
                }
                bcrypt.compare(password, usuario.senha, function(erro, iguais){
                    if(iguais){
                        console.log(usuario)
                        return done(null, usuario)
                    }else{
                        console.log(usuario)
                        return done(null, false, {message: 'Senha incorreta!'})
                    }
                })
            })
        }
    ))

    passport.serializeUser(function(usuario, done){
        done(null, usuario.id)
    })

    passport.deserializeUser(function(id, done){
        Usuario.findByPk(id).then(function(usuario){
            done(null, usuario)
        })
    })

}