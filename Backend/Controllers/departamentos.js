const { connection } = require('../Config/dataBase');

// Obtener todos los departamentos
const mostrarDepartamentos = (req, res) => {
    const query = 'SELECT * FROM Departamentos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener departamentos:', error);
            return res.status(500).json({ message: 'Error al obtener departamentos' });
        }
        res.json(results);
    });
};

// Obtener un departamento por ID
const mostrarDepartamento = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Departamentos WHERE id_departamento = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el departamento:', error);
            return res.status(500).json({ message: 'Error al obtener el departamento' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un departamento
const crearDepartamento = (req, res) => {
    const { nombre, id_provincia } = req.body;
    const query = 'INSERT INTO Departamentos (nombre, id_provincia) VALUES (?, ?)';
    connection.query(query, [nombre, id_provincia], (error, results) => {
        if (error) {
            console.error('Error al crear departamento:', error);
            return res.status(500).json({ message: 'Error al crear departamento' });
        }
        res.status(201).json({ id: results.insertId, message: 'Departamento creado exitosamente' });
    });
};

// Actualizar un departamento
const editarDepartamento = (req, res) => {
    const id = req.params.id;
    const { nombre, id_provincia } = req.body;
    const query = 'UPDATE Departamentos SET nombre = ?, id_provincia = ? WHERE id_departamento = ?';
    connection.query(query, [nombre, id_provincia, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar departamento:', error);
            return res.status(500).json({ message: 'Error al actualizar departamento' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json({ message: 'Departamento actualizado exitosamente' });
    });
};

// Eliminar un departamento
const eliminarDepartamento = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Departamentos WHERE id_departamento = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar departamento:', error);
            return res.status(500).json({ message: 'Error al eliminar departamento' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.json({ message: 'Departamento eliminado exitosamente' });
    });
};

module.exports = {
    mostrarDepartamentos,
    mostrarDepartamento,
    crearDepartamento,
    editarDepartamento,
    eliminarDepartamento
};
