const express = require('express');
const router = express.Router();

const {
    mostrarPagos,
    mostrarPago,
    crearPago,
    editarPago,
    eliminarPago
} = require('../Controllers/pagos');

router.get('/pagos', mostrarPagos);
router.get('/pagos/:id', mostrarPago);
router.post('/pagos', crearPago);
router.put('/pagos/:id', editarPago);
router.delete('/pagos/:id', eliminarPago);

module.exports = router;
