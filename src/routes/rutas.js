const express = require("express");
const router = express.Router();

var dispositivo = require("../modelos/dispositivo").dispositivo;
var fase = require("../modelos/fase").fase;
var soporte = require("../modelos/soporte").soporte;
var notificacion = require("../modelos/notificacion").notificacion;

//principal cuando logeas
router.get("/", function (req, res) {
    res.render("app/Dashboard");
});

router.get("/administrador", function (req, res) {
    dispositivo.find(function(error, dispositivo){
    if(error) {
        console.log(err);
        res.redirect("/admin");   
    }else{
      res.render("app/inicio",{dispositivo});
    }
})
  
});
router.get("/notificacion", function (req, res) {
  notificacion.find({ idpersona: req.session.persona_id},function (err, doc) {
    //console.log(doc);
    res.render("app/notificacion",{notificacion:doc});
  });
});

router.get("/administrador/fasesadmin/:id", function (req, res) {
  fase.find({ id_dispositivo: req.params.id }, function (err, fases) {
    if (err) {
      console.log(err);
      res.redirect("/admin");
    } else {
      dispositivo.findById(req.params.id, (error, dispositivo)=>{
        if(error) {
            console.log(err);
        }else{    
          const disp = req.params.id;
          res.render("app/Fases", {fases, disp, dispositivo});
        }
      });
    }
  });
});

router.get("/administrador/fasesadmin/:id/finalizarfase", function(req,res){
  dispositivo.findById(req.params.id, (error, disp)=>{
    if(error) {
        console.log(err);
    }else{
      const id_personap = disp.idpersona;
      const modelop = disp.modelo;
      const marcap = disp.marca;
      const colorp = disp.color;
      const almacenamientop = disp.almacenamiento;
      const ramp = disp.ram;
      const estadop = 0;
      const observacionp = disp.observacion;
      dispositivo.findByIdAndUpdate(req.params.id, {idpersona: id_personap, modelo:modelop, marca: marcap,color:colorp,almacenamiento:almacenamientop,ram:ramp,estado:estadop,observacion:observacionp}, (error, alumno)=>{
          if(error){
            console.log(err);
          }else{
            //res.render('app/inicio')
            res.redirect('/app/administrador')
          }          
      });
    }
})

});
router.get("/fases/:id", function (req, res) {
  fase.find({ id_dispositivo: req.params.id }, function (err, fases) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      dispositivo.findById(req.params.id, (error, dispositivo)=>{
        if(error) {
            console.log(err);
        }else{    
          res.render("app/FasesCliente", { fases, dispositivo });
        }
      });      
    }
  });
});

// Registro Dispositivo
router.get("/registroDispositivo", function (req, res) {
  dispositivo.find(function (err, doc) {
    console.log(doc);
    res.render("app/registroDispositivo");
  });
});


router.post("/nuevoDispositivo", function (req, res) {
  var dispositivoAux = new dispositivo({
    idpersona: req.session.idpersona,
    modelo: req.body.modelo,
    marca: req.body.marca,
    color: req.body.color,
    almacenamiento: req.body.almacenamiento,
    ram: req.body.ram,
    estado: 1,
    observacion: req.body.observacion,
  });
  dispositivoAux.save().then(
    function (us) {
      res.send("Guardamos los datos de tu dispositivo");
    },
    function (err) {
      if (!err) {
        console.log(String(err));
        res.send("No pudimos guardar la información de tu dispositivo");
      }
    }
  );
});

// Registro Fase
router.get("/registroFase", function (req, res) {
  fase.find(function (err, doc) {
    console.log(doc);
    res.render("app/registroFase");
  });
});

router.post("/nuevaFase", function (req, res) {
  var faseAux = new fase({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });
  faseAux.save().then(
    function (us) {
      res.send("Guardamos los datos de tu Fase");
    },
    function (err) {
      if (!err) {
        console.log(String(err));
        res.send("No pudimos guardar la información de tu Fase");
      }
    }
  );
});

// Registro soporte
router.get("/registroSoporte", function (req, res) {
  soporte.find(function (err, doc) {
    console.log(doc);
    res.render("app/registroSoporte");
  });
});

router.post("/nuevaSoporte", function (req, res) {
  var soporteAux = new soporte({
    cliente: req.body.cliente,
    equipo: req.body.equipo,
    descripcion: req.body.descripcion,
  });
  var dispositivoAux = new dispositivo({
    modelo: req.body.modelo,
    marca: req.body.marca,
    color: req.body.color,
    almacenamiento: req.body.almacenamiento,
    ram: req.body.ram,
    estado: 1,
    observacion: req.body.observacion,
  });
  dispositivoAux.save().then(function (us) {
    res.send("Guardamos los datos de tu Dispositivo");
  });
  soporteAux.save().then(
    function (us) {
      res.send("Guardamos los datos de tu Soporte");
    },
    function (err) {
      if (!err) {
        console.log(String(err));
        res.send("No pudimos guardar la información de tu Soporte");
      }
    }
  );
});
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("app/");
});
router.get("/administrador/logout", function (req, res) {
  console.log("Hola destroyer");
  req.session.destroy();
  res.redirect("/admin");
});

// Registro administradores
router.get("/administrador/registroadmin", function (req, res) {
  res.render("app/registroadmin");
});


module.exports = router;
