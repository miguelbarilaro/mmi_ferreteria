const { connection } = require('../Config/dataBase');

// Obtener todas las potencias
const mostrarPotencias = (req, res) => {
    const query = 'SELECT * FROM Potencias';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener potencias:', error);
            return res.status(500).json({ message: 'Error al obtener potencias' });
        }
        res.json(results);
    });
};

// Obtener una potencia por ID
const mostrarPotencia = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Potencias WHERE id_potencia = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la potencia:', error);
            return res.status(500).json({ message: 'Error al obtener la potencia' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Potencia no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una potencia
const crearPotencia = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Potencias (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear potencia:', error);
            return res.status(500).json({ message: 'Error al crear potencia' });
        }
        res.status(201).json({ id: results.insertId, message: 'Potencia creada exitosamente' });
    });
};

// Actualizar una potencia
const editarPotencia = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Potencias SET nombre = ? WHERE id_potencia = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar potencia:', error);
            return res.status(500).json({ message: 'Error al actualizar potencia' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Potencia no encontrada' });
        }
        res.json({ message: 'Potencia actualizada exitosamente' });
    });
};

// Eliminar una potencia
const eliminarPotencia = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Potencias WHERE id_potencia = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar potencia:', error);
            return res.status(500).json({ message: 'Error al eliminar potencia' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Potencia no encontrada' });
        }
        res.json({ message: 'Potencia eliminada exitosamente' });
    });
};

module.exports = {
    mostrarPotencias,
    mostrarPotencia,
    crearPotencia,
    editarPotencia,
    eliminarPotencia
};
