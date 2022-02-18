const express = require('express')
const router = express.Router()

const dispositivoController = require('../Controllers/DispositivosController')

//Mostrar todos los alumnos (GET)
router.get('/Dashboard', dispositivoController.mostrar)
//Crear alumno (POST)
router.post('/crear', dispositivoController.crear)
//Editar alumno (POST)
router.post('/editar', dispositivoController.editar)
module.exports = router