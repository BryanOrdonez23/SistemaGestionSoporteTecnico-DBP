var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");
//mongoose.connect("mongodb://localhost/SistemaSoporte");

var faseSchema = new Schema({
    id_dispositivo: String,
    nombre: String,
    descripcion: String,
    fecha_inicio: Date,
    fecha_final: Date,  
});

var fase = mongoose.model("fase", faseSchema);
module.exports.fase = fase;