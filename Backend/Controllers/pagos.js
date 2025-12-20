const { connection } = require('../Config/dataBase');

// Obtener todos los pagos
const mostrarPagos = (req, res) => {
    const query = 'SELECT * FROM Pagos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener pagos:', error);
            return res.status(500).json({ message: 'Error al obtener pagos' });
        }
        res.json(results);
    });
};

// Obtener un pago por ID
const mostrarPago = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Pagos WHERE id_pago = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el pago:', error);
            return res.status(500).json({ message: 'Error al obtener el pago' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un pago
const crearPago = (req, res) => {
    const { id_pedido, id_metodo_pago, fecha_pago, monto_pagado, comprobante_nro, estado_pago } = req.body;
    const query = 'INSERT INTO Pagos (id_pedido, id_metodo_pago, fecha_pago, monto_pagado, comprobante_nro, estado_pago) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [id_pedido, id_metodo_pago, fecha_pago, monto_pagado, comprobante_nro, estado_pago], (error, results) => {
        if (error) {
            console.error('Error al crear pago:', error);
            return res.status(500).json({ message: 'Error al crear pago' });
        }
        res.status(201).json({ id: results.insertId, message: 'Pago creado exitosamente' });
    });
};

// Actualizar un pago
const editarPago = (req, res) => {
    const id = req.params.id;
    const { id_pedido, id_metodo_pago, fecha_pago, monto_pagado, comprobante_nro, estado_pago } = req.body;
    const query = 'UPDATE Pagos SET id_pedido = ?, id_metodo_pago = ?, fecha_pago = ?, monto_pagado = ?, comprobante_nro = ?, estado_pago = ? WHERE id_pago = ?';
    connection.query(query, [id_pedido, id_metodo_pago, fecha_pago, monto_pagado, comprobante_nro, estado_pago, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar pago:', error);
            return res.status(500).json({ message: 'Error al actualizar pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json({ message: 'Pago actualizado exitosamente' });
    });
};

// Eliminar un pago
const eliminarPago = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Pagos WHERE id_pago = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar pago:', error);
            return res.status(500).json({ message: 'Error al eliminar pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json({ message: 'Pago eliminado exitosamente' });
    });
};

module.exports = {
    mostrarPagos,
    mostrarPago,
    crearPago,
    editarPago,
    eliminarPago
};
