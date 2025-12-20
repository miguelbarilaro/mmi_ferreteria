const { connection } = require('../Config/dataBase');

// Obtener todas las marcas
const mostrarMarcas = (req, res) => {
    const query = 'SELECT * FROM Marcas';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener marcas:', error);
            return res.status(500).json({ message: 'Error al obtener marcas' });
        }
        res.json(results);
    });
};

// Obtener una marca por ID
const mostrarMarca = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Marcas WHERE id_marca = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la marca:', error);
            return res.status(500).json({ message: 'Error al obtener la marca' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una marca
const crearMarca = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Marcas (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear marca:', error);
            return res.status(500).json({ message: 'Error al crear marca' });
        }
        res.status(201).json({ id: results.insertId, message: 'Marca creada exitosamente' });
    });
};

// Actualizar una marca
const editarMarca = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Marcas SET nombre = ? WHERE id_marca = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar marca:', error);
            return res.status(500).json({ message: 'Error al actualizar marca' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca actualizada exitosamente' });
    });
};

// Eliminar una marca
const eliminarMarca = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Marcas WHERE id_marca = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar marca:', error);
            return res.status(500).json({ message: 'Error al eliminar marca' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json({ message: 'Marca eliminada exitosamente' });
    });
};

module.exports = {
    mostrarMarcas,
    mostrarMarca,
    crearMarca,
    editarMarca,
    eliminarMarca
};
