const mongoose = require("mongoose")
mongoose.set("bufferCommands", false)

module.exports = mongoose
  .connect(process.env.URI)
  .then(respuesta =>
  {
    console.log('[ DB ] URI: ' + process.env.URI)
    return respuesta
  })
  .catch(_ => next(_))
