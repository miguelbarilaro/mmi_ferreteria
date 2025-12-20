const express = require('express');
const router = express.Router();

const {
    mostrarCapacidades,
    mostrarCapacidad,
    crearCapacidad,
    editarCapacidad,
    eliminarCapacidad
} = require('../Controllers/capacidades');

router.get('/capacidades', mostrarCapacidades);
router.get('/capacidades/:id', mostrarCapacidad);
router.post('/capacidades', crearCapacidad);
router.put('/capacidades/:id', editarCapacidad);
router.delete('/capacidades/:id', eliminarCapacidad);

module.exports = router;
