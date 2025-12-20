const { connection } = require('../Config/dataBase');

// Obtener todas las direcciones
const mostrarDirecciones = (req, res) => {
    const query = 'SELECT * FROM Direcciones';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener direcciones:', error);
            return res.status(500).json({ message: 'Error al obtener direcciones' });
        }
        res.json(results);
    });
};

// Obtener una direccion por ID
const mostrarDireccion = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Direcciones WHERE id_direccion = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la direccion:', error);
            return res.status(500).json({ message: 'Error al obtener la direccion' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Direccion no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una direccion
const crearDireccion = (req, res) => {
    const { id_municipio, calle, numero, ubicacion, observaciones } = req.body;
    const query = 'INSERT INTO Direcciones (id_municipio, calle, numero, ubicacion, observaciones) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [id_municipio, calle, numero, ubicacion, observaciones], (error, results) => {
        if (error) {
            console.error('Error al crear direccion:', error);
            return res.status(500).json({ message: 'Error al crear direccion' });
        }
        res.status(201).json({ id: results.insertId, message: 'Direccion creada exitosamente' });
    });
};

// Actualizar una direccion
const editarDireccion = (req, res) => {
    const id = req.params.id;
    const { id_municipio, calle, numero, ubicacion, observaciones } = req.body;
    const query = 'UPDATE Direcciones SET id_municipio = ?, calle = ?, numero = ?, ubicacion = ?, observaciones = ? WHERE id_direccion = ?';
    connection.query(query, [id_municipio, calle, numero, ubicacion, observaciones, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar direccion:', error);
            return res.status(500).json({ message: 'Error al actualizar direccion' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Direccion no encontrada' });
        }
        res.json({ message: 'Direccion actualizada exitosamente' });
    });
};

// Eliminar una direccion
const eliminarDireccion = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Direcciones WHERE id_direccion = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar direccion:', error);
            return res.status(500).json({ message: 'Error al eliminar direccion' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Direccion no encontrada' });
        }
        res.json({ message: 'Direccion eliminada exitosamente' });
    });
};

module.exports = {
    mostrarDirecciones,
    mostrarDireccion,
    crearDireccion,
    editarDireccion,
    eliminarDireccion
};
