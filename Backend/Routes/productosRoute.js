const express = require("express");
const { mostrarProductos, mostrarProducto, crearProducto, actualizarProducto, eliminarProducto } = require("../Controllers/productos");

const router = express.Router();

router.get("/productos", mostrarProductos);
router.get("/productos/:id_producto", mostrarProducto);
router.post("/productos", crearProducto);
router.put("/productos/:id_producto", actualizarProducto);
router.delete("/productos/:id_producto", eliminarProducto);

module.exports = router;
