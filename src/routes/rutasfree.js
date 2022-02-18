
const express = require('express');
const router = express.Router();

var cuenta = require("../modelos/cuenta").cuenta;
var persona = require("../modelos/Persona").persona;


router.get('/login', function(req, res) {
    cuenta.find(function(err,doc){
        console.log(doc);
        res.render('login');        
    });
});

router.post('/users', function(req, res) {
   cuenta.findOne({usuario:req.body.user,password:req.body.password},function(err,docs){
    if(docs == null){
        alert("Datos erroneos");
        res.render('login');
    }else{
        //req.session.cuenta_id= docs._id;
        res.send("Bienvenido");
    }
    });
});

// Registro
router.get('/registro', function(req, res) {
    persona.find(function(err,doc){
        console.log(doc);
        res.render('registro');
    });
});

router.post('/nuevo', function(req, res) {
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
router.get('/', function(req, res) {
    //console.log(req.session.cuenta_id);
    res.render('inicio');
});

module.exports = router;