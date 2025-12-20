const express = require('express');
const router = express.Router();

const {
    mostrarSubcategorias,
    mostrarSubcategoria,
    crearSubcategoria,
    editarSubcategoria,
    eliminarSubcategoria
} = require('../Controllers/subcategorias');

router.get('/subcategorias', mostrarSubcategorias);
router.get('/subcategorias/:id', mostrarSubcategoria);
router.post('/subcategorias', crearSubcategoria);
router.put('/subcategorias/:id', editarSubcategoria);
router.delete('/subcategorias/:id', eliminarSubcategoria);

module.exports = router;
