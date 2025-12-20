const { connection } = require('../Config/database');

// Obtener todos los items de carrito
const mostrarCarritoArticulos = (req, res) => {
    const query = 'SELECT * FROM Carrito_Articulos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener items de carrito:', error);
            return res.status(500).json({ message: 'Error al obtener items de carrito' });
        }
        res.json(results);
    });
};

// Obtener un item por ID
const mostrarCarritoArticulo = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Carrito_Articulos WHERE id_carrito_articulo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener item de carrito:', error);
            return res.status(500).json({ message: 'Error al obtener item de carrito' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Item de carrito no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un item de carrito
const crearCarritoArticulo = (req, res) => {
    const { id_carrito, id_articulo, cantidad, precio_unitario_historico } = req.body;
    const query = 'INSERT INTO Carrito_Articulos (id_carrito, id_articulo, cantidad, precio_unitario_historico) VALUES (?, ?, ?, ?)';
    connection.query(query, [id_carrito, id_articulo, cantidad || 1, precio_unitario_historico], (error, results) => {
        if (error) {
            console.error('Error al crear item de carrito:', error);
            return res.status(500).json({ message: 'Error al crear item de carrito' });
        }
        res.status(201).json({ id: results.insertId, message: 'Item de carrito creado exitosamente' });
    });
};

// Actualizar un item de carrito
const editarCarritoArticulo = (req, res) => {
    const id = req.params.id;
    const { id_carrito, id_articulo, cantidad, precio_unitario_historico } = req.body;
    const query = 'UPDATE Carrito_Articulos SET id_carrito = ?, id_articulo = ?, cantidad = ?, precio_unitario_historico = ? WHERE id_carrito_articulo = ?';
    connection.query(query, [id_carrito, id_articulo, cantidad, precio_unitario_historico, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar item de carrito:', error);
            return res.status(500).json({ message: 'Error al actualizar item de carrito' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item de carrito no encontrado' });
        }
        res.json({ message: 'Item de carrito actualizado exitosamente' });
    });
};

// Eliminar un item de carrito
const eliminarCarritoArticulo = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Carrito_Articulos WHERE id_carrito_articulo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar item de carrito:', error);
            return res.status(500).json({ message: 'Error al eliminar item de carrito' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item de carrito no encontrado' });
        }
        res.json({ message: 'Item de carrito eliminado exitosamente' });
    });
};

module.exports = {
    mostrarCarritoArticulos,
    mostrarCarritoArticulo,
    crearCarritoArticulo,
    editarCarritoArticulo,
    eliminarCarritoArticulo
};
