var persona = require("../modelos/Persona").persona;
const Dispositivo = require('../modelos/dispositivo').dispositivo;
module.exports = function(req,res,next){
    if(!(req.session.cuenta_id)){
        res.redirect("/login");               
    }else{
        persona.findById(req.session.persona_id,function(err,per){
            if(err){
                console.log(err);
                res.redirect("/login");    
            }else{
                Dispositivo.find({idpersona:req.session.persona_id}, function(error, dispositivo){
                    if(error) {
                        console.log(err);
                        res.redirect("/login");   
                    }
                    res.locals =  {dispositivo: dispositivo, persona:per};
                    next();
                })
            }
      });
    }
}