import Sala from '../models/Sala.js'

class SalaController {

  index = async (req, res) => {
    console.log("============= funcao listar salas ===============")
    let salas = await Sala.findAll()
    if (salas.length === 0){
      res.render('sala/vazio')
    }
    res.render('sala/index', { salas })
  }

  salvar = async (req, res) => {
    console.log("============= funcao salvar ===============")
    let sala = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      capacidade: req.body.capacidade,
      disponibilidade: req.body.disponibilidade,
      preco_hora: req.body.preco_hora
    }

    Sala.create(sala).then(() => {
      req.flash('success_msg', 'Sala cadastrada com sucesso!')
      res.redirect('/')
    }).catch(erro => {
      console.log(erro)
      res.redirect('/sala/cadastrar')
    })

  }
  // captura sala individualmente
  // sala = async (req, res) => {
  //   let salaId = req.params.id
  //   let sala = await Sala.find(salaId)
  //   res.render('sala/sala', { sala: sala})
  // }

}

export default new SalaController()
