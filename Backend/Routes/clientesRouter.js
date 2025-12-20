const express = require("express");
const { mostrarClientes, mostrarCliente, crearCliente, actualizarCliente, eliminarCliente } = require("../Controllers/clientes");

const router = express.Router();

router.get("/clientes", mostrarClientes);
router.get("/clientes/:id_cliente", mostrarCliente);
router.post("/clientes", crearCliente);
router.put("/clientes/:id_cliente", actualizarCliente);
router.delete("/clientes/:id_cliente", eliminarCliente);

module.exports = router;
