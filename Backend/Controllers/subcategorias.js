const { connection } = require('../Config/dataBase');

// Obtener todas las subcategorias
const mostrarSubcategorias = (req, res) => {
    const query = 'SELECT * FROM Subcategorias';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener subcategorias:', error);
            return res.status(500).json({ message: 'Error al obtener subcategorias' });
        }
        res.json(results);
    });
};

// Obtener una subcategoria por ID
const mostrarSubcategoria = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Subcategorias WHERE id_subcategoria = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la subcategoria:', error);
            return res.status(500).json({ message: 'Error al obtener la subcategoria' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Subcategoria no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una subcategoria
const crearSubcategoria = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Subcategorias (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear subcategoria:', error);
            return res.status(500).json({ message: 'Error al crear subcategoria' });
        }
        res.status(201).json({ id: results.insertId, message: 'Subcategoria creada exitosamente' });
    });
};

// Actualizar una subcategoria
const editarSubcategoria = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Subcategorias SET nombre = ? WHERE id_subcategoria = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar subcategoria:', error);
            return res.status(500).json({ message: 'Error al actualizar subcategoria' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Subcategoria no encontrada' });
        }
        res.json({ message: 'Subcategoria actualizada exitosamente' });
    });
};

// Eliminar una subcategoria
const eliminarSubcategoria = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Subcategorias WHERE id_subcategoria = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar subcategoria:', error);
            return res.status(500).json({ message: 'Error al eliminar subcategoria' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Subcategoria no encontrada' });
        }
        res.json({ message: 'Subcategoria eliminada exitosamente' });
    });
};

module.exports = {
    mostrarSubcategorias,
    mostrarSubcategoria,
    crearSubcategoria,
    editarSubcategoria,
    eliminarSubcategoria
};
