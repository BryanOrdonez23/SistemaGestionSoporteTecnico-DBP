const express = require('express')
const router = express.Router()

const cuentacontroller = require('../Controllers/cuentacontroller')


router.post('/nuevoadmin', cuentacontroller.nuevoadmin);

module.exports = router