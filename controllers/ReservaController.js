import Reserva from "../models/Reserva.js"

class ReservaController {
    index = async (req, res) => {
        let reservas = await Reserva.findAll()
        console.log("============= chamada a funcao listar reservas ============")
        res.render('reserva/index', { reservas: reservas })
    }

    criarReserva = async(req, res) => {
      let sala_id = req.query.sala_id
      let usuario_id =  req.query.usuario_id
      console.log(sala_id)
      console.log(usuario_id)
      let dataInicio = new Date(Date.now())
      let dataFim = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)


      const reserva = await Reserva.create({
        data_inicio: dataInicio,
        data_fim: dataFim,
        usuario_id: usuario_id,
        sala_id: sala_id
      })
    }
}

export default new ReservaController()
