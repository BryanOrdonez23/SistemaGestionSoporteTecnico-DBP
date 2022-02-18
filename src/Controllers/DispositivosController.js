const Dispositivo = require('../modelos/dispositivo').dispositivo;


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
                message: 'Error al crear el Alumno'
            })
        }
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

