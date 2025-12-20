const { connection } = require('../Config/dataBase');

// Obtener todos los precios
const mostrarPrecios = (req, res) => {
    const query = 'SELECT * FROM Precios';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener precios:', error);
            return res.status(500).json({ message: 'Error al obtener precios' });
        }
        res.json(results);
    });
};

// Obtener un precio por ID
const mostrarPrecio = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Precios WHERE id_precio = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el precio:', error);
            return res.status(500).json({ message: 'Error al obtener el precio' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Precio no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un precio
const crearPrecio = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Precios (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear precio:', error);
            return res.status(500).json({ message: 'Error al crear precio' });
        }
        res.status(201).json({ id: results.insertId, message: 'Precio creado exitosamente' });
    });
};

// Actualizar un precio
const editarPrecio = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Precios SET nombre = ? WHERE id_precio = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar precio:', error);
            return res.status(500).json({ message: 'Error al actualizar precio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Precio no encontrado' });
        }
        res.json({ message: 'Precio actualizado exitosamente' });
    });
};

// Eliminar un precio
const eliminarPrecio = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Precios WHERE id_precio = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar precio:', error);
            return res.status(500).json({ message: 'Error al eliminar precio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Precio no encontrado' });
        }
        res.json({ message: 'Precio eliminado exitosamente' });
    });
};

module.exports = {
    mostrarPrecios,
    mostrarPrecio,
    crearPrecio,
    editarPrecio,
    eliminarPrecio
};
