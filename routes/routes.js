const app = require("express")()

app.use("/cronometro", require("./cronometro.route.js"))

module.exports = app
