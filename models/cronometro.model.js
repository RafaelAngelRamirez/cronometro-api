const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CronometroSchema = new Schema({
  inicio: Date,
  inicio_dia: Number,
  inicio_mes: Number,
  inicio_anio: Number,

  fin: Date,
  fin_dia: Number,
  fin_mes: Number,
  fin_anio: Number,

  proyecto: String,
  cliente: String,
  observaciones: String,
  estatus: String,
})

module.exports = mongoose.model("cronometro", CronometroSchema)

