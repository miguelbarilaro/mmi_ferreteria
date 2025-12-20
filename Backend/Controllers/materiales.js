const { connection } = require('../Config/dataBase');

// Obtener todos los materiales
const mostrarMateriales = (req, res) => {
    const query = 'SELECT * FROM Materiales';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener materiales:', error);
            return res.status(500).json({ message: 'Error al obtener materiales' });
        }
        res.json(results);
    });
};

// Obtener un material por ID
const mostrarMaterial = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Materiales WHERE id_material = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el material:', error);
            return res.status(500).json({ message: 'Error al obtener el material' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un material
const crearMaterial = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Materiales (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear material:', error);
            return res.status(500).json({ message: 'Error al crear material' });
        }
        res.status(201).json({ id: results.insertId, message: 'Material creado exitosamente' });
    });
};

// Actualizar un material
const editarMaterial = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Materiales SET nombre = ? WHERE id_material = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar material:', error);
            return res.status(500).json({ message: 'Error al actualizar material' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json({ message: 'Material actualizado exitosamente' });
    });
};

// Eliminar un material
const eliminarMaterial = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Materiales WHERE id_material = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar material:', error);
            return res.status(500).json({ message: 'Error al eliminar material' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Material no encontrado' });
        }
        res.json({ message: 'Material eliminado exitosamente' });
    });
};

module.exports = {
    mostrarMateriales,
    mostrarMaterial,
    crearMaterial,
    editarMaterial,
    eliminarMaterial
};
