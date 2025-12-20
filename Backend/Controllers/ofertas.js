const { connection } = require('../Config/dataBase');

// Obtener todas las ofertas
const mostrarOfertas = (req, res) => {
    const query = 'SELECT * FROM Ofertas';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener ofertas:', error);
            return res.status(500).json({ message: 'Error al obtener ofertas' });
        }
        res.json(results);
    });
};

// Obtener una oferta por ID
const mostrarOferta = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Ofertas WHERE id_oferta = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la oferta:', error);
            return res.status(500).json({ message: 'Error al obtener la oferta' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una oferta
const crearOferta = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Ofertas (nombre) VALUES (?)';
    connection.query(query, [nombre], (error, results) => {
        if (error) {
            console.error('Error al crear oferta:', error);
            return res.status(500).json({ message: 'Error al crear oferta' });
        }
        res.status(201).json({ id: results.insertId, message: 'Oferta creada exitosamente' });
    });
};

// Actualizar una oferta
const editarOferta = (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    const query = 'UPDATE Ofertas SET nombre = ? WHERE id_oferta = ?';
    connection.query(query, [nombre, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar oferta:', error);
            return res.status(500).json({ message: 'Error al actualizar oferta' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json({ message: 'Oferta actualizada exitosamente' });
    });
};

// Eliminar una oferta
const eliminarOferta = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Ofertas WHERE id_oferta = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar oferta:', error);
            return res.status(500).json({ message: 'Error al eliminar oferta' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.json({ message: 'Oferta eliminada exitosamente' });
    });
};

module.exports = {
    mostrarOfertas,
    mostrarOferta,
    crearOferta,
    editarOferta,
    eliminarOferta
};
