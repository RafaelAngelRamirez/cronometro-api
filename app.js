require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT

require("./configuraciones_generales/db/db")
  .then(() => {
    app.use(require("./configuraciones_generales/express_conf.js"))
    app.use(require("./routes/routes"))
  })
  .catch(_ => console.log(_))
