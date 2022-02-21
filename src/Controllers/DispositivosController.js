
const Dispositivo = require('../modelos/dispositivo').dispositivo;
const fase = require("../modelos/fase").fase;
const notificacion = require("../modelos/notificacion").notificacion;
//Mostrar
module.exports.mostrar = (req, res)=>{
    Dispositivo.find({idpersona: req.session.persona_id}, (error, dispositivo)=>{
        if(error) {
            return res.status(500).json({
                message: 'Error mostrando los dispositivos'
            })
        }
        return res.render('app/Dashboard', {dispositivo: dispositivo})
    })
}

//Crear
module.exports.crear = (req, res)=>{
    //console.log(req.body)
    const dispositivo = new Dispositivo({
            idpersona: req.session.persona_id,
            modelo:req.body.modelo,
            marca:req.body.marca,
            color:req.body.color,
            almacenamiento:req.body.almacenamiento,
            ram:req.body.ram,
            estado:1,
            observacion:req.body.observacion,
    })
    dispositivo.save(function(error,disp){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Dispositivo'
            })
        }
        var faseAux = new fase({ id_dispositivo: disp._id,
                                 nombre:"Fase Revisión",
                                 descripcion:"",
                                 fecha_inicio: new Date,
                                 fecha_final: "",                                  
                                }); 
        faseAux.save().then(function(us){
        },function(err){
        if(!err){
        console.log(String(err));
        }
        });
        var faseAux = new fase({ id_dispositivo: disp._id,
                    nombre:"Fase Mantenimiento",
                    descripcion:"",
                    fecha_inicio: new Date,
                    fecha_final: "",  
                 }); 
        faseAux.save().then(function(us){        
        },function(err){
        if(!err){
        console.log(String(err));
        
        }
        });
        var faseAux = new fase({ id_dispositivo: disp._id,
            nombre:"Fase Entrega",
            descripcion:"",
            fecha_inicio: new Date,
            fecha_final: "", 
         }); 
        faseAux.save().then(function(us){        
        },function(err){
        if(!err){
        console.log(String(err));
        }
        });
        res.redirect('/app')        
    })
}

//Editar
module.exports.editar = (req,res)=>{
    const modelo = req.body.id_editar
    const marca = req.body.nombre_editar
    const color = req.body.edad_editar
    const almacenamiento = req.body.edad_editar
    const ram = req.body.edad_editar
    const estado = req.body.edad_editar
    const observacion = req.body.edad_editar
    Dispositivo.findByIdAndUpdate(id, {nombre, edad}, (error, alumno)=>{
        if(error){
            return res.status(500).json({
                message: 'Error actualizando el Alumno'
            })
        }
        res.redirect('/')
    })
}
module.exports.editarfase1 = (req,res)=>{
    const id = req.body.fase1;
    const id_dispositivop = req.params.id;
    const nombrep = req.body.inrevision;
    const descripcionp = req.body.txtdescripcionRev;
    const fecha_inicalp = req.body.infechainicialRev;
    const fecha_finalp = new Date;
    fase.findByIdAndUpdate(req.body.fase1,{id_dispositivo: id_dispositivop,nombre: nombrep, descripcion:descripcionp, fecha_inicio: fecha_inicalp, fecha_final: fecha_finalp}, (error, fase)=>{
        if(error){
            return res.status(500).json({
                message: 'Error actualizando el Alumno'
            })
        }else{
            Dispositivo.findById(fase.id_dispositivo, (error, disp)=>{
                if(error) {
                    console.log(error);
                }else{
                    var notificacionp = new notificacion({idpersona:disp.idpersona,
                        iddispositivo:disp._id,
                        cuerpo:"Hay nuevas modificaciones en la FASE 1 de tu dispositivo: "+disp.modelo,
                        fecha: new Date,
                        });                    
                    notificacionp.save().then(
                        function (us) {
                          console.log("Bien")                          
                        },
                        function (err) {
                          if (!err) {
                            console.log(String(err));
                            console.log("mal")
                          }
                        }
                      );
                }
            })            
            res.redirect('app/administrador')
        }        
    })
}



module.exports.editarfase2 = (req,res)=>{
    const id = req.body.fase2;
    const id_dispositivop = req.params.id;
    const nombrep = req.body.inmantenimiento;
    const descripcionp = req.body.txtdescripcionMan;
    const fecha_inicalp = req.body.infechainicialMan;
    const fecha_finalp = new Date;
    fase.findByIdAndUpdate(req.body.fase2,{id_dispositivo: id_dispositivop,nombre: nombrep, descripcion:descripcionp,fecha_inicio: fecha_inicalp, fecha_final: fecha_finalp}, (error, fase)=>{
        if(error){
            return res.status(500).json({
                message: 'Error actualizando el Alumno'
            })
        }else{
            Dispositivo.findById(fase.id_dispositivo, (error, disp)=>{
                if(error) {
                    console.log(error);
                }else{
                    var notificacionp = new notificacion({idpersona:disp.idpersona,
                        iddispositivo:disp._id,
                        cuerpo:"Hay nuevas modificaciones en la FASE 2 de tu dispositivo: "+disp.modelo,
                        fecha: new Date,
                        });                    
                    notificacionp.save().then(
                        function (us) {
                          console.log("Bien")                          
                        },
                        function (err) {
                          if (!err) {
                            console.log(String(err));
                            console.log("mal")
                          }
                        }
                      );
                }
            }) 
            res.redirect('app/administrador')
        }        
    })

}

module.exports.editarfase3 = (req,res)=>{
    const id = req.body.fase3;
    const id_dispositivop = req.params.id;
    const nombrep = req.body.inentrega;
    const descripcionp = req.body.txtdescripcionEn;
    const fecha_inicalp = req.body.infechainicialEn;
    const fecha_finalp = new Date;
    fase.findByIdAndUpdate(req.body.fase3,{id_dispositivo: id_dispositivop,nombre: nombrep, descripcion:descripcionp,fecha_inicio: fecha_inicalp, fecha_final: fecha_finalp}, (error, fase)=>{
        if(error){
            return res.status(500).json({
                message: 'Error actualizando el Alumno'
            })
        }else{
            Dispositivo.findById(fase.id_dispositivo, (error, disp)=>{
                if(error) {
                    console.log(error);
                }else{
                    var notificacionp = new notificacion({idpersona:disp.idpersona,
                        iddispositivo:disp._id,
                        cuerpo:"Hay nuevas modificaciones en la FASE 3 de tu dispositivo: "+disp.modelo,
                        fecha: new Date,
                        });                    
                    notificacionp.save().then(
                        function (us) {
                          console.log("Bien")                          
                        },
                        function (err) {
                          if (!err) {
                            console.log(String(err));
                            console.log("mal")
                          }
                        }
                      );
                }
            }) 
            res.redirect('app/administrador')
        }        
    })

}

