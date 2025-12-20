const express = require('express');
const router = express.Router();

const {
    mostrarMarcas,
    mostrarMarca,
    crearMarca,
    editarMarca,
    eliminarMarca
} = require('../Controllers/marcas');

router.get('/marcas', mostrarMarcas);
router.get('/marcas/:id', mostrarMarca);
router.post('/marcas', crearMarca);
router.put('/marcas/:id', editarMarca);
router.delete('/marcas/:id', eliminarMarca);

module.exports = router;
