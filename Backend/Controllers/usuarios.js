const { connection } = require("../Config/dataBase");

const mostrarUsuarios = (req, res) => {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
            console.error("❌ Error al obtener usuarios:", error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log("✅ Usuarios obtenidos:", results.length, "registros");
        res.json(results);
    });
};

const mostrarUsuario = (req, res) => {
    const { id_usuario } = req.params;
    connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length === 0) return res.status(404).json({ error: "No encontrado" });
        res.json(results[0]);
    });
};

const crearUsuario = (req, res) => {
    const { id_usuario, nombre, telefono } = req.body;

    if (!id_usuario || !nombre || !telefono) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const query = `
        INSERT INTO usuarios (id_usuario, nombre, telefono) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, 
        [id_usuario, nombre, telefono], 
        (error, results) => {
            if (error) {
                console.error("❌ Error en DB:", error);
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json({ 
                message: "Usuario creado", 
                id_usuario: results.insertId 
            });
        }
    );
};

const actualizarUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const query = `
        UPDATE usuarios 
        SET nombre = ?, telefono = ?
        WHERE id_usuario = ?
    `;

    connection.query(query,
        [nombre, telefono, id_usuario],
        (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            if (results.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });

            res.json({ message: "Usuario actualizado" });
        }
    );
};


const eliminarUsuario = (req, res) => {
    const { id_usuario } = req.params;
    connection.query("DELETE FROM usuarios WHERE id_usuario = ?", [id_usuario], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
        res.json({ message: "Usuario eliminado" });
    });
};

module.exports = { mostrarUsuarios, 
    mostrarUsuario, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
};