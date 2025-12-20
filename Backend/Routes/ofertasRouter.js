const express = require('express');
const router = express.Router();

const {
    mostrarOfertas,
    mostrarOferta,
    crearOferta,
    editarOferta,
    eliminarOferta
} = require('../Controllers/ofertas');

router.get('/ofertas', mostrarOfertas);
router.get('/ofertas/:id', mostrarOferta);
router.post('/ofertas', crearOferta);
router.put('/ofertas/:id', editarOferta);
router.delete('/ofertas/:id', eliminarOferta);

module.exports = router;
