var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/SistemaSoporte");

var notificacionSchema = new Schema({
    idpersona: String,
    iddispositivo: String,
    cuerpo: String,
    fecha: Date,
});

var notificacion = mongoose.model("notificacion", notificacionSchema);
module.exports.notificacion = notificacion;