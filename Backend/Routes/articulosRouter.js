const express = require('express');
const router = express.Router();

const {
    mostrarArticulos,
    mostrarArticulo,
    crearArticulo,
    editarArticulo,
    eliminarArticulo
} = require('../Controllers/articulos');

router.get('/articulos', mostrarArticulos);
router.get('/articulos/:id', mostrarArticulo);
router.post('/articulos', crearArticulo);
router.put('/articulos/:id', editarArticulo);
router.delete('/articulos/:id', eliminarArticulo);

module.exports = router;
