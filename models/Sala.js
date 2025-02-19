import banco from "../config/banco.js";

const Sala = banco.sequelize.define('sala', {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: banco.Sequelize.STRING
    },
    descricao: {
        type: banco.Sequelize.STRING
    },
    capacidade: {
        type: banco.Sequelize.INTEGER
    },
    disponibilidade: {
        type: banco.Sequelize.BOOLEAN
    },
    preco_hora: {
        type: banco.Sequelize.FLOAT
    }

})

Sala.sync()
export default Sala
