const { connection } = require("../Config/dataBase");

const mostrarClientes = (req, res) => {
    connection.query("SELECT * FROM Clientes", (error, results) => {
        if (error) {
            console.error("❌ Error al obtener clientes:", error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log("✅ Clientes obtenidos:", results.length, "registros");
        res.json(results);
    });
};

const mostrarCliente = (req, res) => {
    const { id_cliente } = req.params;
    connection.query("SELECT * FROM Clientes WHERE id_cliente = ?", [id_cliente], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.length === 0) return res.status(404).json({ error: "No encontrado" });
        res.json(results[0]);
    });
};

const crearCliente = (req, res) => {
    const cliente = req.body || {};

    // Use INSERT ... SET ? for flexible inserts (only provided fields will be inserted)
    connection.query('INSERT INTO Clientes SET ?', cliente, (error, results) => {
        if (error) {
            console.error('❌ Error al crear cliente:', error.message);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Cliente creado', id_cliente: results.insertId });
    });
};

const actualizarCliente  = (req, res) => {
    const { id_cliente } = req.params;
    const updates = req.body || {};

    connection.query('UPDATE Clientes SET ? WHERE id_cliente = ?', [updates, id_cliente], (error, results) => {
        if (error) {
            console.error('❌ Error al actualizar cliente:', error.message);
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Cliente actualizado' });
    });
};


const eliminarCliente = (req, res) => {
    const { id_cliente } = req.params;
    connection.query('DELETE FROM Clientes WHERE id_cliente = ?', [id_cliente], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Cliente eliminado' });
    });
};

module.exports = { mostrarClientes, 
    mostrarCliente, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
};