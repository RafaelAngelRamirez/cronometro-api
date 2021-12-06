require("dotenv").config()
const express = require("express")
const app = express()

require("./configuraciones_generales/db/db")
  .then(() => {
    app.use(require("./configuraciones_generales/express_conf.js"))
    app.use(require("./routes/routes"))

    app.use((err, req, res, next) => {
      console.log(err)
    })

    app.listen(process.env.PORT, () => {
      console.log(`[ + ] En linea:${process.env.PORT}`)
    })
  })
  .catch(_ => console.log(_))
