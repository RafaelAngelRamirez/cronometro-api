const app = require("express")()

const Cronometro = require("../models/cronometro.model")
console.log("cargo")

function transformarFechas(req, res, next)
{
  if (req.body?.inicio)
  {
    let iniD = new Date(req.body.inicio)
    let inicio = {}
    inicio["inicio_dia"] = iniD.getUTCDate()
    inicio["inicio_mes"] = iniD.getUTCMonth()
    inicio["inicio_anio"] = iniD.getUTCFullYear()
    req.body = { ...req.body, ...inicio }
  }

  if (req.body?.fin)
  {
    let finD = new Date(req.body.fin)
    let fin = {}
    fin["fin_dia"] = finD.getUTCDate()
    fin["fin_mes"] = finD.getUTCMonth()
    fin["fin_anio"] = finD.getUTCFullYear()
    req.body = { ...req.body, ...fin }
  }

  return next()
}

app.post("/", transformarFechas, (req, res, next) =>
{
  new Cronometro(req.body)
    .save()
    .then(periodo => res.send({ periodo }))
    .catch(_ => next(_))
})

app.put("/", transformarFechas, (req, res, next) =>
{
  Cronometro.findByIdAndUpdate(req.body._id, req.body)
    .then(periodo => res.send({ periodo }))
    .catch(_ => next(_))
})

app.get("/", (req, res, next) =>
{
  let limit = (req.query.limit || 500) * 1
  let skip = (req.query.skip || 0) * 1

  delete req.query.limit
  delete req.query.skip

  Cronometro.find(req.query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt")
    .then(periodos => res.send({ periodos }))
    .catch(_ => next(_))
})

app.get("/ultimo_registro_pendiente", (req, res, next) =>
{
  Cronometro.findOne()
    .sort("-createdAt")
    .then(periodo =>
    {
      res.send({ periodo })
    })
    .catch(_ => next(_))
})

app.get("/clientes", (req, res, next) =>
{
  Cronometro.aggregate([
    { $match: { cliente: { $exists: true } } },
    { $group: { _id: "$cliente" } },
  ])
    .then(clientes =>
    {
      res.send({ clientes: clientes.map(x => x._id) })
    })
    .catch(_ => next(_))
})

app.get("/proyectos", (req, res, next) =>
{
  Cronometro.aggregate([
    { $match: { proyecto: { $exists: true } } },
    { $group: { _id: "$proyecto" } },
  ])
    .then(proyectos =>
    {
      res.send({ proyectos: proyectos.map(x => x._id) })
    })
    .catch(_ => next(_))
})

app.get("/estatus", (req, res, next) =>
{
  Cronometro.aggregate([
    { $match: { estatus: { $exists: true } } },
    { $group: { _id: "$estatus" } },
  ])
    .then(estatus =>
    {
      res.send({ estatus: estatus.map(x => x._id) })
    })
    .catch(_ => next(_))
})

// app.delete("/all", (req, res, next) => {
//   Cronometro.deleteMany({})
//     .then(() => res.sendStatus(200))
//     .catch(_ => next(_))
// })

app.delete("/:id", (req, res, next) =>
{
  Cronometro.findOneAndDelete(req.params.id)
    .then(() => res.send({}))
    .catch(_ => next(_))
})

module.exports = app
