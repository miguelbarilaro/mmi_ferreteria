const { connection } = require('../Config/dataBase');

// Obtener todas las dimensiones
const mostrarDimensiones = (req, res) => {
    const query = 'SELECT * FROM Dimensiones';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener dimensiones:', error);
            return res.status(500).json({ message: 'Error al obtener dimensiones' });
        }
        res.json(results);
    });
};

// Obtener una dimension por ID
const mostrarDimension = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Dimensiones WHERE id_dimension = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la dimension:', error);
            return res.status(500).json({ message: 'Error al obtener la dimension' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Dimension no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una dimension
const crearDimension = (req, res) => {
    const { largo, ancho, profundidad } = req.body;
    const query = 'INSERT INTO Dimensiones (largo, ancho, profundidad) VALUES (?, ?, ?)';
    connection.query(query, [largo, ancho, profundidad], (error, results) => {
        if (error) {
            console.error('Error al crear dimension:', error);
            return res.status(500).json({ message: 'Error al crear dimension' });
        }
        res.status(201).json({ id: results.insertId, message: 'Dimension creada exitosamente' });
    });
};

// Actualizar una dimension
const editarDimension = (req, res) => {
    const id = req.params.id;
    const { largo, ancho, profundidad } = req.body;
    const query = 'UPDATE Dimensiones SET largo = ?, ancho = ?, profundidad = ? WHERE id_dimension = ?';
    connection.query(query, [largo, ancho, profundidad, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar dimension:', error);
            return res.status(500).json({ message: 'Error al actualizar dimension' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Dimension no encontrada' });
        }
        res.json({ message: 'Dimension actualizada exitosamente' });
    });
};

// Eliminar una dimension
const eliminarDimension = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Dimensiones WHERE id_dimension = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar dimension:', error);
            return res.status(500).json({ message: 'Error al eliminar dimension' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Dimension no encontrada' });
        }
        res.json({ message: 'Dimension eliminada exitosamente' });
    });
};

module.exports = {
    mostrarDimensiones,
    mostrarDimension,
    crearDimension,
    editarDimension,
    eliminarDimension
};
