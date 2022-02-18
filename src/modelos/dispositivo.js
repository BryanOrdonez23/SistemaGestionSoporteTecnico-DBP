var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");

var dispositivoSchema = new Schema({
    idpersona: String,
    modelo: String,
    marca: String,
    color: String,    
    almacenamiento: String,
    ram: String,
    estado: Number,
    observacion: String,
});

var dispositivo = mongoose.model("dispositivo", dispositivoSchema);
module.exports.dispositivo = dispositivo;