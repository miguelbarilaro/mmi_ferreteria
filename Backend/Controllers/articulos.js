const { connection } = require('../Config/database');

// Obtener todos los articulos
const mostrarArticulos = (req, res) => {
    const query = 'SELECT * FROM Articulos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener articulos:', error);
            return res.status(500).json({ message: 'Error al obtener articulos' });
        }
        res.json(results);
    });
};

// Obtener un articulo por ID
const mostrarArticulo = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Articulos WHERE id_articulo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el articulo:', error);
            return res.status(500).json({ message: 'Error al obtener el articulo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un articulo
const crearArticulo = (req, res) => {
    const {
        nombre,
        descripcion,
        id_categoria,
        id_subcategoria,
        id_tipo,
        id_marca,
        id_color,
        id_capacidad,
        id_dimension,
        id_potencia,
        id_material,
        id_precio,
        id_oferta
    } = req.body;

    const query = `INSERT INTO Articulos (
        nombre, descripcion, id_categoria, id_subcategoria, id_tipo, id_marca,
        id_color, id_capacidad, id_dimension, id_potencia, id_material, id_precio, id_oferta
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
        nombre, descripcion, id_categoria, id_subcategoria, id_tipo, id_marca,
        id_color, id_capacidad, id_dimension, id_potencia, id_material, id_precio, id_oferta
    ], (error, results) => {
        if (error) {
            console.error('Error al crear articulo:', error);
            return res.status(500).json({ message: 'Error al crear articulo' });
        }
        res.status(201).json({ id: results.insertId, message: 'Articulo creado exitosamente' });
    });
};

// Actualizar un articulo
const editarArticulo = (req, res) => {
    const id = req.params.id;
    const {
        nombre,
        descripcion,
        id_categoria,
        id_subcategoria,
        id_tipo,
        id_marca,
        id_color,
        id_capacidad,
        id_dimension,
        id_potencia,
        id_material,
        id_precio,
        id_oferta
    } = req.body;

    const query = `UPDATE Articulos SET nombre = ?, descripcion = ?, id_categoria = ?, id_subcategoria = ?, id_tipo = ?, id_marca = ?, id_color = ?, id_capacidad = ?, id_dimension = ?, id_potencia = ?, id_material = ?, id_precio = ?, id_oferta = ? WHERE id_articulo = ?`;

    connection.query(query, [
        nombre, descripcion, id_categoria, id_subcategoria, id_tipo, id_marca,
        id_color, id_capacidad, id_dimension, id_potencia, id_material, id_precio, id_oferta, id
    ], (error, results) => {
        if (error) {
            console.error('Error al actualizar articulo:', error);
            return res.status(500).json({ message: 'Error al actualizar articulo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.json({ message: 'Articulo actualizado exitosamente' });
    });
};

// Eliminar un articulo
const eliminarArticulo = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM Articulos WHERE id_articulo = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar articulo:', error);
            return res.status(500).json({ message: 'Error al eliminar articulo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }
        res.json({ message: 'Articulo eliminado exitosamente' });
    });
};

module.exports = {
    mostrarArticulos,
    mostrarArticulo,
    crearArticulo,
    editarArticulo,
    eliminarArticulo
};
