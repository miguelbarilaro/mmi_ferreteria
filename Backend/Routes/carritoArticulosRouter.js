const express = require('express');
const router = express.Router();

const {
    mostrarCarritoArticulos,
    mostrarCarritoArticulo,
    crearCarritoArticulo,
    editarCarritoArticulo,
    eliminarCarritoArticulo
} = require('../Controllers/carrito_articulos');

router.get('/carrito-articulos', mostrarCarritoArticulos);
router.get('/carrito-articulos/:id', mostrarCarritoArticulo);
router.post('/carrito-articulos', crearCarritoArticulo);
router.put('/carrito-articulos/:id', editarCarritoArticulo);
router.delete('/carrito-articulos/:id', eliminarCarritoArticulo);

module.exports = router;
