const { connection } = require('../Config/database');

// Obtener todas las categorias
const mostrarCategorias = (req, res) => {
    const query = 'SELECT * FROM Categorias';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener categorias:', error);
            return res.status(500).json({ message: 'Error al obtener categorias' });
        }
        res.json(results);
    });
};

// Obtener una categoria por ID
const mostrarCategoria = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Categorias WHERE id_categoria = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la categoria:', error);
            return res.status(500).json({ message: 'Error al obtener la categoria' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una categoria
const crearCategoria = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Categorias (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear categoria:', error);
            return res.status(500).json({ message: 'Error al crear categoria' });
        }
        res.status(201).json({ id: results.insertId, message: 'Categoria creada exitosamente' });
    });
};

// Actualizar una categoria
const editarCategoria = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Categorias SET nombre = ? WHERE id_categoria = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar categoria:', error);
            return res.status(500).json({ message: 'Error al actualizar categoria' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.json({ message: 'Categoria actualizada exitosamente' });
    });
};

// Eliminar una categoria
const eliminarCategoria = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Categorias WHERE id_categoria = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar categoria:', error);
            return res.status(500).json({ message: 'Error al eliminar categoria' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.json({ message: 'Categoria eliminada exitosamente' });
    });
};

module.exports = {
    mostrarCategorias,
    mostrarCategoria,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
};
