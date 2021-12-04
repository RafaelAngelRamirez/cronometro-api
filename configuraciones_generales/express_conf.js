const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors)
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))
app.use(require("compression")())

app.listen(process.env.PORT, () => {
  console.log(`[ + ] En linea:${process.env.PORT}`)
})

module.exports = app
