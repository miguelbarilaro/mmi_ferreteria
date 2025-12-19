const { connection } = require("../Config/dataBase");

/* ======================
   MOSTRAR TODOS
====================== */
const mostrarProductos = (req, res) => {
    connection.query("SELECT * FROM productos", (error, results) => {
        if (error) {
            console.error("❌ Error al obtener productos:", error.message);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
};

/* ======================
   MOSTRAR UNO
====================== */
const mostrarProducto = (req, res) => {
    const { id_producto } = req.params;

    connection.query(
        "SELECT * FROM productos WHERE id_producto = ?",
        [id_producto],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.length === 0)
                return res.status(404).json({ error: "No encontrado" });

            res.json(results[0]);
        }
    );
};

/* ======================
   CREAR
====================== */
const crearProducto = (req, res) => {
    const data = req.body;

    // 🔹 eliminar null / undefined
    const campos = Object.keys(data).filter(
        key => data[key] !== null && data[key] !== undefined
    );

    if (campos.length === 0) {
        return res.status(400).json({ error: "Sin datos para insertar" });
    }

    const valores = campos.map(c => data[c]);
    const placeholders = campos.map(() => "?").join(",");

    const query = `
        INSERT INTO productos (${campos.join(",")})
        VALUES (${placeholders})
    `;

    console.log("QUERY:", query);
    console.log("VALORES:", valores);

    connection.query(query, valores, (error, results) => {
        if (error) {
            console.error("❌ Error DB:", error);
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            message: "Producto creado",
            id_producto: results.insertId
        });
    });
};

/* ======================
   ACTUALIZAR
====================== */
const actualizarProducto = (req, res) => {
    const { id_producto } = req.params;

    const {
        codigo, descripcion, info_adic, familia, fabricante, marca, iva, unidad,
        concepto, cod_barra, lista, envase, cant_envase, origen, aduana, garantia,
        serie, num_parte, control_stock, stock_min, stock_max, stock_seg,
        punto_pedido, costo_reposicion, moneda_costo, peso_kg, fecha_act_costo,
        nota, estado, url_foto, ubicacion, act_ing_bruto, imp_interno_ncm,
        tipo_articulo, categoria_ml, variaciones, cod_regla_stock,
        cod_proveedor, proveedor
    } = req.body;

    const query = `
        UPDATE productos SET
            codigo=?, descripcion=?, info_adic=?, familia=?, fabricante=?, marca=?,
            iva=?, unidad=?, concepto=?, cod_barra=?, lista=?, envase=?, cant_envase=?,
            origen=?, aduana=?, garantia=?, serie=?, num_parte=?, control_stock=?,
            stock_min=?, stock_max=?, stock_seg=?, punto_pedido=?,
            costo_reposicion=?, moneda_costo=?, peso_kg=?, fecha_act_costo=?,
            nota=?, estado=?, url_foto=?, ubicacion=?, act_ing_bruto=?,
            imp_interno_ncm=?, tipo_articulo=?, categoria_ml=?, variaciones=?,
            cod_regla_stock=?, cod_proveedor=?, proveedor=?
        WHERE id_producto=?
    `;

    connection.query(
        query,
        [
            codigo, descripcion, info_adic, familia, fabricante, marca, iva, unidad,
            concepto, cod_barra, lista, envase, cant_envase, origen, aduana, garantia,
            serie, num_parte, control_stock, stock_min, stock_max, stock_seg,
            punto_pedido, costo_reposicion, moneda_costo, peso_kg, fecha_act_costo,
            nota, estado, url_foto, ubicacion, act_ing_bruto, imp_interno_ncm,
            tipo_articulo, categoria_ml, variaciones, cod_regla_stock,
            cod_proveedor, proveedor, id_producto
        ],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0)
                return res.status(404).json({ error: "No encontrado" });

            res.json({ message: "Producto actualizado" });
        }
    );
};

/* ======================
   ELIMINAR
====================== */
const eliminarProducto = (req, res) => {
    const { id_producto } = req.params;

    connection.query(
        "DELETE FROM productos WHERE id_producto = ?",
        [id_producto],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0)
                return res.status(404).json({ error: "No encontrado" });

            res.json({ message: "Producto eliminado" });
        }
    );
};

module.exports = {
    mostrarProductos,
    mostrarProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
