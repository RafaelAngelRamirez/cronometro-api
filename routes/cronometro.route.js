const app = require("express")()

const Cronometro = require("../models/cronometro.model")
console.log("cargo")

function transformarFechas(req, res, next) {
  if (req.body?.inicio) {
    let iniD = new Date(req.body.inicio)
    let inicio = {}
    inicio["inicio_dia"] = iniD.getUTCDate()
    inicio["inicio_mes"] = iniD.getUTCMonth()
    inicio["inicio_anio"] = iniD.getUTCFullYear()
    req.body = { ...req.body, ...inicio }
  }

  if (req.body?.fin) {
    let finD = new Date(req.body.fin)
    let fin = {}
    fin["fin_dia"] = finD.getUTCDate()
    fin["fin_mes"] = finD.getUTCMonth()
    fin["fin_anio"] = finD.getUTCFullYear()
    req.body = { ...req.body, ...fin }
  }

  return next()
}

app.post("/", transformarFechas, (req, res, next) => {
  new Cronometro(req.body)
    .save()
    .then(periodo => res.send({ periodo }))
    .catch(_ => next(_))
})

app.put("/", transformarFechas, (req, res, next) => {
  Cronometro.findByIdAndUpdate(req.body._id, req.body)
    .then(periodo => res.send({ periodo }))
    .catch(_ => next(_))
})

app.get("/", (req, res, next) => {
  let limit = req.body.limit | 500
  let skip = req.body.skip | 0
  Cronometro.find()
    .limit(limit)
    .skip(skip)
    .then(periodos => res.send({ periodos }))
    .catch(_ => next(_))
})

app.delete("/:id", (req, res, next) => {
  Cronometro.findOneAndDelete(req.query.params)
    .then(() => res.send(200))
    .catch(_ => next(_))
})

module.exports = app
