import Reserva from "../models/Reserva.js"

class ReservaController {
    index = async (req, res) => {
        let reservas = await Reserva.findAll()
        console.log("============= chamada a funcao listar reservas ============")
        res.render('reserva/index', { reservas })
    }
}

export default new ReservaController()
