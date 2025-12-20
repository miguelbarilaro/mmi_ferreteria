const { connection } = require('../Config/dataBase');

// Obtener todas las personas
const mostrarPersonas = (req, res) => {
    const query = 'SELECT * FROM Personas';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener personas:', error);
            return res.status(500).json({ message: 'Error al obtener personas' });
        }
        res.json(results);
    });
};

// Obtener una persona por ID
const mostrarPersona = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Personas WHERE id_persona = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la persona:', error);
            return res.status(500).json({ message: 'Error al obtener la persona' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una persona
const crearPersona = (req, res) => {
    const { cuil, dni, fecha_nacimiento, edad, id_direccion } = req.body;
    const query = 'INSERT INTO Personas (cuil, dni, fecha_nacimiento, edad, id_direccion) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [cuil, dni, fecha_nacimiento, edad, id_direccion], (error, results) => {
        if (error) {
            console.error('Error al crear persona:', error);
            return res.status(500).json({ message: 'Error al crear persona' });
        }
        res.status(201).json({ id: results.insertId, message: 'Persona creada exitosamente' });
    });
};

// Actualizar una persona
const editarPersona = (req, res) => {
    const id = req.params.id;
    const { cuil, dni, fecha_nacimiento, edad, id_direccion } = req.body;
    const query = 'UPDATE Personas SET cuil = ?, dni = ?, fecha_nacimiento = ?, edad = ?, id_direccion = ? WHERE id_persona = ?';
    connection.query(query, [cuil, dni, fecha_nacimiento, edad, id_direccion, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar persona:', error);
            return res.status(500).json({ message: 'Error al actualizar persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.json({ message: 'Persona actualizada exitosamente' });
    });
};

// Eliminar una persona
const eliminarPersona = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Personas WHERE id_persona = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar persona:', error);
            return res.status(500).json({ message: 'Error al eliminar persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.json({ message: 'Persona eliminada exitosamente' });
    });
};

module.exports = {
    mostrarPersonas,
    mostrarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona
};
