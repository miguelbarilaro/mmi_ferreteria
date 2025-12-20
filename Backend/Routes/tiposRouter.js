const express = require('express');
const router = express.Router();

const {
    mostrarTipos,
    mostrarTipo,
    crearTipo,
    editarTipo,
    eliminarTipo
} = require('../Controllers/tipos');

router.get('/tipos', mostrarTipos);
router.get('/tipos/:id', mostrarTipo);
router.post('/tipos', crearTipo);
router.put('/tipos/:id', editarTipo);
router.delete('/tipos/:id', eliminarTipo);

module.exports = router;
