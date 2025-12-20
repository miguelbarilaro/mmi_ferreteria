const express = require('express');
const router = express.Router();

const {
    mostrarPotencias,
    mostrarPotencia,
    crearPotencia,
    editarPotencia,
    eliminarPotencia
} = require('../Controllers/potencias');

router.get('/potencias', mostrarPotencias);
router.get('/potencias/:id', mostrarPotencia);
router.post('/potencias', crearPotencia);
router.put('/potencias/:id', editarPotencia);
router.delete('/potencias/:id', eliminarPotencia);

module.exports = router;
