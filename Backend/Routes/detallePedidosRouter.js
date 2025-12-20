const express = require('express');
const router = express.Router();

const {
    mostrarDetallePedidos,
    mostrarDetallePedido,
    crearDetallePedido,
    editarDetallePedido,
    eliminarDetallePedido
} = require('../Controllers/detalle_pedidos');

router.get('/detalle-pedidos', mostrarDetallePedidos);
router.get('/detalle-pedidos/:id', mostrarDetallePedido);
router.post('/detalle-pedidos', crearDetallePedido);
router.put('/detalle-pedidos/:id', editarDetallePedido);
router.delete('/detalle-pedidos/:id', eliminarDetallePedido);

module.exports = router;
