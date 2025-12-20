const { connection } = require('../Config/database');

// Obtener todos los carritos
const mostrarCarritos = (req, res) => {
    const query = 'SELECT * FROM Carritos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener carritos:', error);
            return res.status(500).json({ message: 'Error al obtener carritos' });
        }
        res.json(results);
    });
};

// Obtener un carrito por ID
const mostrarCarrito = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Carritos WHERE id_carrito = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el carrito:', error);
            return res.status(500).json({ message: 'Error al obtener el carrito' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un carrito
const crearCarrito = (req, res) => {
    const { id_usuario, estado } = req.body;
    const query = 'INSERT INTO Carritos (id_usuario, estado) VALUES (?, ?)';
    connection.query(query, [id_usuario, estado || 'pendiente'], (error, results) => {
        if (error) {
            console.error('Error al crear carrito:', error);
            return res.status(500).json({ message: 'Error al crear carrito' });
        }
        res.status(201).json({ id: results.insertId, message: 'Carrito creado exitosamente' });
    });
};

// Actualizar un carrito
const editarCarrito = (req, res) => {
    const id = req.params.id;
    const { id_usuario, estado } = req.body;
    const query = 'UPDATE Carritos SET id_usuario = ?, estado = ? WHERE id_carrito = ?';
    connection.query(query, [id_usuario, estado, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar carrito:', error);
            return res.status(500).json({ message: 'Error al actualizar carrito' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json({ message: 'Carrito actualizado exitosamente' });
    });
};

// Eliminar un carrito
const eliminarCarrito = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Carritos WHERE id_carrito = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar carrito:', error);
            return res.status(500).json({ message: 'Error al eliminar carrito' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json({ message: 'Carrito eliminado exitosamente' });
    });
};

module.exports = {
    mostrarCarritos,
    mostrarCarrito,
    crearCarrito,
    editarCarrito,
    eliminarCarrito
};
