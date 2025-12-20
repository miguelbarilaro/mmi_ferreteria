const { connection } = require('../Config/database');

// Obtener todas las capacidades
const mostrarCapacidades = (req, res) => {
    const query = 'SELECT * FROM Capacidades';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener capacidades:', error);
            return res.status(500).json({ message: 'Error al obtener capacidades' });
        }
        res.json(results);
    });
};

// Obtener una capacidad por ID
const mostrarCapacidad = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Capacidades WHERE id_capacidad = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la capacidad:', error);
            return res.status(500).json({ message: 'Error al obtener la capacidad' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Capacidad no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una capacidad
const crearCapacidad = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Capacidades (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear capacidad:', error);
            return res.status(500).json({ message: 'Error al crear capacidad' });
        }
        res.status(201).json({ id: results.insertId, message: 'Capacidad creada exitosamente' });
    });
};

// Actualizar una capacidad
const editarCapacidad = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Capacidades SET nombre = ? WHERE id_capacidad = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar capacidad:', error);
            return res.status(500).json({ message: 'Error al actualizar capacidad' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Capacidad no encontrada' });
        }
        res.json({ message: 'Capacidad actualizada exitosamente' });
    });
};

// Eliminar una capacidad
const eliminarCapacidad = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Capacidades WHERE id_capacidad = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar capacidad:', error);
            return res.status(500).json({ message: 'Error al eliminar capacidad' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Capacidad no encontrada' });
        }
        res.json({ message: 'Capacidad eliminada exitosamente' });
    });
};

module.exports = {
    mostrarCapacidades,
    mostrarCapacidad,
    crearCapacidad,
    editarCapacidad,
    eliminarCapacidad
};
