const express = require("express")
const app = express()
const cors = require("cors")
const compression = require("compression")

app.use(cors())
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))
app.use(compression())

module.exports = app
