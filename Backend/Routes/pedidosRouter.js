const express = require('express');
const router = express.Router();

const {
    mostrarPedidos,
    mostrarPedido,
    crearPedido,
    editarPedido,
    eliminarPedido
} = require('../Controllers/pedidos');

router.get('/pedidos', mostrarPedidos);
router.get('/pedidos/:id', mostrarPedido);
router.post('/pedidos', crearPedido);
router.put('/pedidos/:id', editarPedido);
router.delete('/pedidos/:id', eliminarPedido);

module.exports = router;
