var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");

var soporteSchema = new Schema({
    cliente: String,
    equipo: String,
    descripcion: String,    
});

var soporte = mongoose.model("soporte", soporteSchema);
module.exports.soporte = soporte;