import banco from "../config/banco.js";
import Usuario from './Usuario.js'
import Sala from './Sala.js'

const Reserva = banco.sequelize.define('reservas', {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_inicio: {
        type: banco.Sequelize.DATE,
        allowNull: false
    },
    data_fim: {
        type: banco.Sequelize.DATE,
        allowNull: false
    }
})

// RESERVA pertence ao modelo USUARIO E SALA
Reserva.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    onDelete: 'CASCADE',
    as: 'usuario'
})
Reserva.belongsTo(Sala, {
    foreignKey: 'sala_id',
    constraint: true,
    onDelete: 'CASCADE',
    as: 'sala'
})

export default Reserva
