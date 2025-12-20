const express = require('express');
const router = express.Router();

const {
    mostrarPrecios,
    mostrarPrecio,
    crearPrecio,
    editarPrecio,
    eliminarPrecio
} = require('../Controllers/precios');

router.get('/precios', mostrarPrecios);
router.get('/precios/:id', mostrarPrecio);
router.post('/precios', crearPrecio);
router.put('/precios/:id', editarPrecio);
router.delete('/precios/:id', eliminarPrecio);

module.exports = router;
