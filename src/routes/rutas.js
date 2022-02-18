const express = require('express');
const router = express.Router();

var dispositivo = require("../modelos/dispositivo").dispositivo;
var fase = require("../modelos/fase").fase;
var soporte = require("../modelos/soporte").soporte;

//principal cuando logeas
router.get('/', function(req, res) {
        res.render("app/Dashboard");        
});

// Registro Dispositivo
router.get('/registroDispositivo', function(req, res) {
    dispositivo.find(function(err,doc){
        console.log(doc);
        res.render('app/registroDispositivo');
    });
});

router.post('/nuevoDispositivo', function(req, res) {
    var dispositivoAux = new dispositivo({
                                idpersona: req.session.idpersona,
                                modelo:req.body.modelo,
                                marca:req.body.marca,
                                color:req.body.color,
                                almacenamiento:req.body.almacenamiento,
                                ram:req.body.ram,
                                estado:1,
                                observacion:req.body.observacion,
                                }); 
    dispositivoAux.save().then(function(us){
        res.send("Guardamos los datos de tu dispositivo");
    },function(err){
        if(!err){
        console.log(String(err));
        res.send("No pudimos guardar la información de tu dispositivo");
        }
    });
});

// Registro Fase
router.get('/registroFase', function(req, res) {
    fase.find(function(err,doc){
        console.log(doc);
        res.render('app/registroFase');
    });
});

router.post('/nuevaFase', function(req, res) {
    var faseAux = new fase({nombre:req.body.nombre,
                                descripcion:req.body.descripcion,
                                }); 
    faseAux.save().then(function(us){
        res.send("Guardamos los datos de tu Fase");
    },function(err){
        if(!err){
        console.log(String(err));
        res.send("No pudimos guardar la información de tu Fase");
        }
    });
});

// Registro soporte
router.get('/registroSoporte', function(req, res) {
    soporte.find(function(err,doc){
        console.log(doc);
        res.render('app/registroSoporte');
    });
});

router.post('/nuevaSoporte', function(req, res) {
    var soporteAux = new soporte({cliente:req.body.cliente,
                                equipo:req.body.equipo,
                                descripcion:req.body.descripcion,
                                }); 
    var dispositivoAux = new dispositivo({modelo:req.body.modelo,
                                marca:req.body.marca,
                                color:req.body.color,
                                almacenamiento:req.body.almacenamiento,
                                ram:req.body.ram,
                                estado:1,
                                observacion:req.body.observacion,
                                }); 
    dispositivoAux.save().then(function(us){
        res.send("Guardamos los datos de tu Dispositivo");
    });
    soporteAux.save().then(function(us){
        res.send("Guardamos los datos de tu Soporte");
    },function(err){
        if(!err){
        console.log(String(err));
        res.send("No pudimos guardar la información de tu Soporte");
        }
    });
});
module.exports = router;