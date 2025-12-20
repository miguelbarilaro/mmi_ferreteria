const { connection } = require('../Config/dataBase');

// Obtener todos los metodos de pago
const mostrarMetodosPago = (req, res) => {
    const query = 'SELECT * FROM Metodos_Pago';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener metodos de pago:', error);
            return res.status(500).json({ message: 'Error al obtener metodos de pago' });
        }
        res.json(results);
    });
};

// Obtener metodo de pago por ID
const mostrarMetodoPago = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Metodos_Pago WHERE id_metodo_pago = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener metodo de pago:', error);
            return res.status(500).json({ message: 'Error al obtener metodo de pago' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear metodo de pago
const crearMetodoPago = (req, res) => {
    const { nombre_metodo } = req.body;
    const query = 'INSERT INTO Metodos_Pago (nombre_metodo) VALUES (?)';
    connection.query(query, [nombre_metodo], (error, results) => {
        if (error) {
            console.error('Error al crear metodo de pago:', error);
            return res.status(500).json({ message: 'Error al crear metodo de pago' });
        }
        res.status(201).json({ id: results.insertId, message: 'Metodo de pago creado exitosamente' });
    });
};

// Actualizar metodo de pago
const editarMetodoPago = (req, res) => {
    const id = req.params.id;
    const { nombre_metodo } = req.body;
    const query = 'UPDATE Metodos_Pago SET nombre_metodo = ? WHERE id_metodo_pago = ?';
    connection.query(query, [nombre_metodo, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar metodo de pago:', error);
            return res.status(500).json({ message: 'Error al actualizar metodo de pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.json({ message: 'Metodo de pago actualizado exitosamente' });
    });
};

// Eliminar metodo de pago
const eliminarMetodoPago = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Metodos_Pago WHERE id_metodo_pago = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar metodo de pago:', error);
            return res.status(500).json({ message: 'Error al eliminar metodo de pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.json({ message: 'Metodo de pago eliminado exitosamente' });
    });
};

module.exports = {
    mostrarMetodosPago,
    mostrarMetodoPago,
    crearMetodoPago,
    editarMetodoPago,
    eliminarMetodoPago
};
