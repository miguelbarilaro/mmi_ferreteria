const { connection } = require('../Config/dataBase');

// Obtener todos los tipos
const mostrarTipos = (req, res) => {
    const query = 'SELECT * FROM Tipos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener tipos:', error);
            return res.status(500).json({ message: 'Error al obtener tipos' });
        }
        res.json(results);
    });
};

// Obtener un tipo por ID
const mostrarTipo = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Tipos WHERE id_tipo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el tipo:', error);
            return res.status(500).json({ message: 'Error al obtener el tipo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un tipo
const crearTipo = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Tipos (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear tipo:', error);
            return res.status(500).json({ message: 'Error al crear tipo' });
        }
        res.status(201).json({ id: results.insertId, message: 'Tipo creado exitosamente' });
    });
};

// Actualizar un tipo
const editarTipo = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Tipos SET nombre = ? WHERE id_tipo = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar tipo:', error);
            return res.status(500).json({ message: 'Error al actualizar tipo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.json({ message: 'Tipo actualizado exitosamente' });
    });
};

// Eliminar un tipo
const eliminarTipo = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Tipos WHERE id_tipo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar tipo:', error);
            return res.status(500).json({ message: 'Error al eliminar tipo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.json({ message: 'Tipo eliminado exitosamente' });
    });
};

module.exports = {
    mostrarTipos,
    mostrarTipo,
    crearTipo,
    editarTipo,
    eliminarTipo
};
