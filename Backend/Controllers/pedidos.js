const { connection } = require('../Config/dataBase');

// Obtener todos los pedidos
const mostrarPedidos = (req, res) => {
    const query = 'SELECT * FROM Pedidos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener pedidos:', error);
            return res.status(500).json({ message: 'Error al obtener pedidos' });
        }
        res.json(results);
    });
};

// Obtener un pedido por ID
const mostrarPedido = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Pedidos WHERE id_pedido = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el pedido:', error);
            return res.status(500).json({ message: 'Error al obtener el pedido' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un pedido
const crearPedido = (req, res) => {
    const { id_usuario, id_cliente, total_final, estado_pedido } = req.body;
    const query = 'INSERT INTO Pedidos (id_usuario, id_cliente, total_final, estado_pedido) VALUES (?, ?, ?, ?)';
    connection.query(query, [id_usuario, id_cliente, total_final, estado_pedido], (error, results) => {
        if (error) {
            console.error('Error al crear pedido:', error);
            return res.status(500).json({ message: 'Error al crear pedido' });
        }
        res.status(201).json({ id: results.insertId, message: 'Pedido creado exitosamente' });
    });
};

// Actualizar un pedido
const editarPedido = (req, res) => {
    const id = req.params.id;
    const { id_usuario, id_cliente, total_final, estado_pedido } = req.body;
    const query = 'UPDATE Pedidos SET id_usuario = ?, id_cliente = ?, total_final = ?, estado_pedido = ? WHERE id_pedido = ?';
    connection.query(query, [id_usuario, id_cliente, total_final, estado_pedido, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar pedido:', error);
            return res.status(500).json({ message: 'Error al actualizar pedido' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido actualizado exitosamente' });
    });
};

// Eliminar un pedido
const eliminarPedido = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Pedidos WHERE id_pedido = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar pedido:', error);
            return res.status(500).json({ message: 'Error al eliminar pedido' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido eliminado exitosamente' });
    });
};

module.exports = {
    mostrarPedidos,
    mostrarPedido,
    crearPedido,
    editarPedido,
    eliminarPedido
};
