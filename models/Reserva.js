import banco from '../config.banco.js'

const Reserva = banco.sequelize.define('reserva', {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

})