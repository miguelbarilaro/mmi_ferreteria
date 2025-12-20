const express = require('express');
const router = express.Router();

const {
    mostrarColores,
    mostrarColor,
    crearColor,
    editarColor,
    eliminarColor
} = require('../Controllers/colores');

router.get('/colores', mostrarColores);
router.get('/colores/:id', mostrarColor);
router.post('/colores', crearColor);
router.put('/colores/:id', editarColor);
router.delete('/colores/:id', eliminarColor);

module.exports = router;
