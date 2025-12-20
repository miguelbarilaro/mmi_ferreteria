const express = require('express');
const router = express.Router();

const {
    mostrarCarritos,
    mostrarCarrito,
    crearCarrito,
    editarCarrito,
    eliminarCarrito
} = require('../Controllers/carritos');

router.get('/carritos', mostrarCarritos);
router.get('/carritos/:id', mostrarCarrito);
router.post('/carritos', crearCarrito);
router.put('/carritos/:id', editarCarrito);
router.delete('/carritos/:id', eliminarCarrito);

module.exports = router;
