const { connection } = require('../Config/dataBase');

// Obtener todos los colores
const mostrarColores = (req, res) => {
    const query = 'SELECT * FROM Colores';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener colores:', error);
            return res.status(500).json({ message: 'Error al obtener colores' });
        }
        res.json(results);
    });
};

// Obtener un color por ID
const mostrarColor = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Colores WHERE id_color = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el color:', error);
            return res.status(500).json({ message: 'Error al obtener el color' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un color
const crearColor = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Colores (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear color:', error);
            return res.status(500).json({ message: 'Error al crear color' });
        }
        res.status(201).json({ id: results.insertId, message: 'Color creado exitosamente' });
    });
};

// Actualizar un color
const editarColor = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Colores SET nombre = ? WHERE id_color = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar color:', error);
            return res.status(500).json({ message: 'Error al actualizar color' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json({ message: 'Color actualizado exitosamente' });
    });
};

// Eliminar un color
const eliminarColor = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Colores WHERE id_color = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar color:', error);
            return res.status(500).json({ message: 'Error al eliminar color' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Color no encontrado' });
        }
        res.json({ message: 'Color eliminado exitosamente' });
    });
};

module.exports = {
    mostrarColores,
    mostrarColor,
    crearColor,
    editarColor,
    eliminarColor
};
