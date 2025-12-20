const express = require('express');
const router = express.Router();

const {
    mostrarMetodosPago,
    mostrarMetodoPago,
    crearMetodoPago,
    editarMetodoPago,
    eliminarMetodoPago
} = require('../Controllers/metodos_pago');

router.get('/metodos-pago', mostrarMetodosPago);
router.get('/metodos-pago/:id', mostrarMetodoPago);
router.post('/metodos-pago', crearMetodoPago);
router.put('/metodos-pago/:id', editarMetodoPago);
router.delete('/metodos-pago/:id', eliminarMetodoPago);

module.exports = router;
