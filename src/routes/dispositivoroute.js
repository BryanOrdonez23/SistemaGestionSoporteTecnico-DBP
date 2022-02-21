const express = require('express')
const router = express.Router()

const dispositivoController = require('../Controllers/DispositivosController')

//Mostrar todos los alumnos (GET)
router.get('/Dashboard', dispositivoController.mostrar)
//Crear alumno (POST)
router.post('/crear', dispositivoController.crear)
//Editar alumno (POST)
router.post('/editar', dispositivoController.editar)
router.post('/editarfase1', dispositivoController.editarfase1)
router.post('/editarfase2', dispositivoController.editarfase2)
router.post('/editarfase3', dispositivoController.editarfase3)
module.exports = router