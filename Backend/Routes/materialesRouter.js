const express = require('express');
const router = express.Router();

const {
    mostrarMateriales,
    mostrarMaterial,
    crearMaterial,
    editarMaterial,
    eliminarMaterial
} = require('../Controllers/materiales');

router.get('/materiales', mostrarMateriales);
router.get('/materiales/:id', mostrarMaterial);
router.post('/materiales', crearMaterial);
router.put('/materiales/:id', editarMaterial);
router.delete('/materiales/:id', eliminarMaterial);

module.exports = router;
