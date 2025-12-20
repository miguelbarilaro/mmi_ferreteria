const express = require('express');
const router = express.Router();

const {
    mostrarDimensiones,
    mostrarDimension,
    crearDimension,
    editarDimension,
    eliminarDimension
} = require('../Controllers/dimensiones');

router.get('/dimensiones', mostrarDimensiones);
router.get('/dimensiones/:id', mostrarDimension);
router.post('/dimensiones', crearDimension);
router.put('/dimensiones/:id', editarDimension);
router.delete('/dimensiones/:id', eliminarDimension);

module.exports = router;
