import banco from "../config/banco.js";

const Usuario = banco.sequelize.define('usuario', {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: banco.Sequelize.STRING
    },
    senha: {
        type: banco.Sequelize.STRING
    },
    tipo: {
        type: banco.Sequelize.INTEGER
    },
    nome: {
      type: banco.Sequelize.STRING
    }
})

Usuario.sync()
export default Usuario
