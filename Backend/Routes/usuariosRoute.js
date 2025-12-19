const express = require("express");
const { mostrarUsuarios, mostrarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } = require("../Controllers/usuarios");

const router = express.Router();

router.get("/usuarios", mostrarUsuarios);
router.get("/usuarios/:id_usuario", mostrarUsuario);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id_usuario", actualizarUsuario);
router.delete("/usuarios/:id_usuario", eliminarUsuario);

module.exports = router;
