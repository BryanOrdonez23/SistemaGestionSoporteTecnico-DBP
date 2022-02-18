const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require('path');
var session = require("express-session");
const hostname = '127.0.0.1';
const port = 3000;
var rutasl = require('./routes/rutas');
var session_middlewares = require("./middlewares/session");

//importando modelos
var cuenta = require("./modelos/cuenta").cuenta;
var persona = require("./modelos/Persona").persona;

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Setiamos el motor de plantillas
app.set('view engine', 'ejs');

//Sessiones
app.use(session({
  secret:"djk54fds2fsdojgids75",
  resave: false,
  saveUninitialized:false
}));

//login admin
app.get('/admin', function(req, res) {
  cuenta.find(function(err,doc){
      console.log(doc);
      res.render('loginadmin');        
  });
});
app.post('/adminsingin', function(req, res) {
  cuenta.findOne({usuario:req.body.user,password:req.body.password},function(err,docs){
   if(docs == null){
       res.send('No se pudo ingresar');
   }else{
       req.session.cuenta_id= docs._id;
       persona.findOne({cedula:docs.id_persona},function(err,per){
           if(per==null){
                console.log(err);
           }else{
             req.session.persona_id= per._id;
             console.log(req.session.persona_id);
             res.render("app/inicio");
           }           
        });
   }
   });
});

//login
app.get('/login', function(req, res) {
    cuenta.find(function(err,doc){
        console.log(doc);
        res.render('login');        
    });
});

app.post('/singin', function(req, res) {
    cuenta.findOne({usuario:req.body.user,password:req.body.password},function(err,docs){
        if(docs == null){
            res.send('No se pudo ingresar');
        }else{
            req.session.cuenta_id= docs._id;
            persona.findOne({cedula:docs.id_persona},function(err,per){
                if(per==null){
                     console.log(err);
                }else{
                  req.session.persona_id= per._id;
                  console.log(req.session.persona_id);
                  res.redirect("/app");
                }           
             });
        }
        });
});

// Registro
app.get('/registro', function(req, res) {
    persona.find(function(err,doc){
        console.log(doc);
        res.render('registro');
    });
});

app.post('/nuevo', function(req, res) {
    var personaaux = new persona({nombre:req.body.nombre,
                                apellido:req.body.apellido,
                                cedula:req.body.cedula,
                                fecha_nacimiento:req.body.fecha_n,
                                direccion:req.body.direccion,
                                genero:req.body.genero,
                                correo:req.body.correo,
                                celular:req.body.celular,
                                estado: 1
                                }); 
    var cuentaaux = new cuenta({id_persona:req.body.cedula,usuario:req.body.user,password:req.body.password});  
    cuentaaux.save().then(function(){
    }); 
    personaaux.save().then(function(us){
        res.send("Guardamos tus datos");
    },function(err){
        if(!err){
        console.log(String(err));
        res.send("No pudimos guardar la información");
        }
    });
});
// Pagina de inicio sin logeo
app.get('/', function(req, res) {
    res.render('info');
});

//Usos
app.use('/app', session_middlewares);
app.use('/app', rutasl);
const dispositivo = require('./routes/dispositivoroute')
app.use(dispositivo)

//Server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});