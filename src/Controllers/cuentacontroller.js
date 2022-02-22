var cuenta = require("../modelos/cuenta").cuenta;
var persona = require("../modelos/Persona").persona;

module.exports.nuevoadmin = (req, res)=>{

    var personaaux = new persona({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      fecha_nacimiento: req.body.fecha_n,
      direccion: req.body.direccion,
      genero: req.body.genero,
      correo: req.body.correo,
      celular: req.body.celular,
      estado: 1,
    });
    var cuentaaux = new cuenta({
      id_persona: req.body.cedula,
      usuario: req.body.user,
      password: req.body.password,
      rol: "Administrador",
    });
    cuentaaux.save().then(function () {});
    personaaux.save().then(
      function (us) {
        res.redirect("app/administrador");
      },
      function (err) {
        if (!err) {
          console.log(String(err));
          res.send("No pudimos guardar la información");
        }
      }
    );
  };