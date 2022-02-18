var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");
//mongoose.connect("mongodb://localhost/SistemaSoporte");

var faseSchema = new Schema({
    nombre: String,
    descripcion: String,    
});

var fase = mongoose.model("fase", faseSchema);
module.exports.fase = fase;