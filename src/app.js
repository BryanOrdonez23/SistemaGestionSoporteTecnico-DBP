const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require('path');
var session = require("express-session");
const hostname = '127.0.0.1';
const port = 3000;

//importando modelos
var cuenta = require("./modelos/cuenta").cuenta;
var persona = require("./modelos/Persona").persona;

//Middlewares
app.use(session({
    secret:"djk54fds2fsdojgids75",
    resave: false,
    saveUninitialized:false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setiamos el motor de plantillas
app.set('view engine', 'ejs');

// Routing - enviamos al servidor

//Login
app.get('/login', function(req, res) {
    cuenta.find(function(err,doc){
        console.log(doc);
        res.render('login');        
    });
});

app.post('/users', function(req, res) {
    //console.log("Tu constrseña es:"+req.body.password);
    //console.log("Tu user es:"+req.body.user);
    //var cuentaaux = new cuenta({usuario:req.body.user,password:req.body.password});  
    //cuentaaux.save().then(function(us){
       // res.send("Guardamos tus datos");
  //  },function(err){
       // if(!err){
       // console.log(String(err));
       // res.send("No pudimos guardar la información");
       // }
   // });
   cuenta.findOne({usuario:req.body.user,password:req.body.password},function(err,docs){
    if(docs == null){
        alert("Datos erroneos");
        res.render('login');
    }else{
        req.session.cuenta_id= docs._id;
        res.send("Bienvenido");
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
    var cuentaaux = new cuenta({usuario:req.body.user,password:req.body.password});  
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

// Pagina de inicio
app.get('/', function(req, res) {
    console.log(req.session.cuenta_id);
    res.render('inicio');
});
//Server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});