const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const popup = require("node-popup");
var session = require("express-session");
const hostname = "127.0.0.1";
const port = 3000;
var rutasl = require("./routes/rutas");
var session_middlewares = require("./middlewares/session");
var admin_middlewares = require("./middlewares/administrador");

//importando modelos
var cuenta = require("./modelos/cuenta").cuenta;
var persona = require("./modelos/Persona").persona;
var fase = require("./modelos/fase").fase;

//Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Setiamos el motor de plantillas
app.set("view engine", "ejs");

//Sessiones
app.use(
  session({
    secret: "djk54fds2fsdojgids75",
    resave: false,
    saveUninitialized: false,
  })
);

//login admin
app.get("/admin", function (req, res) {
  res.render("loginadmin", { message: null });
});
app.post("/adminsingin", function (req, res) {
  cuenta.findOne(
    { usuario: req.body.user, password: req.body.password },
    function (err, docs) {
      if (docs == null) {
        console.log(err);
        req.session.message = {
          type: "danger",
          intro: "Datos incorrectos. Vuelva a intentarlo",
        };
        res.render("loginadmin", { message: req.session.message });
      } else {
          if(docs.rol == "Administrador"){
            req.session.cuenta_id = docs._id;
            persona.findOne({ cedula: docs.id_persona }, function (err, per) {
              if (per == null) {
                console.log(err);
              } else {
                req.session.persona_id = per._id;
                res.redirect("app/administrador");
              }
            });
          }else{
            console.log(err);
            req.session.message = {
              type: "danger",
              intro: "No tienes derechos de acceso.",
            };
            res.render("loginadmin", { message: req.session.message });
          }
      }
    }
  );
});

//login
app.get("/login", function (req, res) {
  res.render("login", { message: null });
});

app.post("/singin", function (req, res) {
  cuenta.findOne(
    { usuario: req.body.user, password: req.body.password },
    function (err, docs) {
      if (docs == null) {
        console.log(err);
        req.session.message = {
          type: "danger",
          intro: "Datos incorrectos. Vuelva a intentarlo",
        };
        res.render("login", { message: req.session.message });
      } else {
        if (docs.rol == "Cliente") {
          req.session.cuenta_id = docs._id;
          persona.findOne({ cedula: docs.id_persona }, function (err, per) {
            if (per == null) {
              console.log(err);
            } else {
              req.session.persona_id = per._id;
              res.redirect("/app");
            }
          });
        } else {
          console.log(err);
          req.session.message = {
            type: "danger",
            intro: "No tienes derechos de acceso.",
          };
          res.render("login", { message: req.session.message });
        }
      }
    }
  );
});

// Registro clientes
app.get("/registro", function (req, res) {
  res.render("registro");
});

app.post("/nuevo", function (req, res) {
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
    rol: "Cliente",
  });
  cuentaaux.save().then(function () {});
  personaaux.save().then(
    function (us) {
      res.redirect("/");
    },
    function (err) {
      if (!err) {
        console.log(String(err));
        res.send("No pudimos guardar la información");
      }
    }
  );
});

// Pagina de inicio sin logeo
app.get("/", function (req, res) {
  res.render("info");
});

//Usos
app.use("/app", session_middlewares);
app.use("/administrador", admin_middlewares);
app.use("/app", rutasl);
app.use("/administrador", rutasl);
const dispositivo = require("./routes/dispositivoroute");
app.use(dispositivo);
const cuentacontroler = require("./routes/cuentarouter");
app.use(cuentacontroler);
//Server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
