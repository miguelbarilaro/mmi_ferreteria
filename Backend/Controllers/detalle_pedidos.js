const { connection } = require('../Config/dataBase');

// Obtener todos los detalles de pedidos
const mostrarDetallePedidos = (req, res) => {
    const query = 'SELECT * FROM Detalle_Pedidos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener detalle de pedidos:', error);
            return res.status(500).json({ message: 'Error al obtener detalle de pedidos' });
        }
        res.json(results);
    });
};

// Obtener un detalle por ID
const mostrarDetallePedido = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Detalle_Pedidos WHERE id_detalle = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener detalle de pedido:', error);
            return res.status(500).json({ message: 'Error al obtener detalle de pedido' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un detalle de pedido
const crearDetallePedido = (req, res) => {
    const { id_pedido, id_articulo, cantidad, precio_unitario_historico, subtotal } = req.body;
    const query = 'INSERT INTO Detalle_Pedidos (id_pedido, id_articulo, cantidad, precio_unitario_historico, subtotal) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [id_pedido, id_articulo, cantidad, precio_unitario_historico, subtotal], (error, results) => {
        if (error) {
            console.error('Error al crear detalle de pedido:', error);
            return res.status(500).json({ message: 'Error al crear detalle de pedido' });
        }
        res.status(201).json({ id: results.insertId, message: 'Detalle de pedido creado exitosamente' });
    });
};

// Actualizar un detalle de pedido
const editarDetallePedido = (req, res) => {
    const id = req.params.id;
    const { id_pedido, id_articulo, cantidad, precio_unitario_historico, subtotal } = req.body;
    const query = 'UPDATE Detalle_Pedidos SET id_pedido = ?, id_articulo = ?, cantidad = ?, precio_unitario_historico = ?, subtotal = ? WHERE id_detalle = ?';
    connection.query(query, [id_pedido, id_articulo, cantidad, precio_unitario_historico, subtotal, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar detalle de pedido:', error);
            return res.status(500).json({ message: 'Error al actualizar detalle de pedido' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.json({ message: 'Detalle de pedido actualizado exitosamente' });
    });
};

// Eliminar un detalle de pedido
const eliminarDetallePedido = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Detalle_Pedidos WHERE id_detalle = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar detalle de pedido:', error);
            return res.status(500).json({ message: 'Error al eliminar detalle de pedido' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.json({ message: 'Detalle de pedido eliminado exitosamente' });
    });
};

module.exports = {
    mostrarDetallePedidos,
    mostrarDetallePedido,
    crearDetallePedido,
    editarDetallePedido,
    eliminarDetallePedido
};
