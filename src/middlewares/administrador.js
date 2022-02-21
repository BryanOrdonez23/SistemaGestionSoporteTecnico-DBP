var persona = require("../modelos/Persona").persona;
const Dispositivo = require('../modelos/dispositivo').dispositivo;
module.exports = function(req,res,next){
    if(!(req.session.cuenta_id)){
        res.redirect("/admin");               
    }else{
        persona.findById(req.session.persona_id,function(err,per){
            if(err){
                console.log(err);
                res.redirect("/admin");    
            }else{
                Dispositivo.find(function(error, dispositivo){
                    if(error) {
                        console.log(err);
                        res.redirect("/admin");   
                    }
                    res.locals =  {Dispositivo: dispositivo, persona:per};
                    next();
                })
            }
      });
    }
}