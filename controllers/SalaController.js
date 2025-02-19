class SalaController {
    index = (req, res) => {
      res.render('sala/index')
    }
}

export default new SalaController()