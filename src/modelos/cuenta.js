var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");

var cuentaSchema = new Schema({
  usuario: String,
  password: String,
});

cuentaSchema.virtual("password_confirmation").get(function () {
    return this.p_c;
  }).set(function (password) {
    this.p_c = password;
  });

var cuenta = mongoose.model("cuenta", cuentaSchema);
module.exports.cuenta = cuenta;
