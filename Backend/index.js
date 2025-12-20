require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {connection} = require('./Config/dataBase');
const usuariosRoute = require('./Routes/usuariosRoute');
const chatRoute = require('./Routes/chatRoute');
const authRoute = require('./Routes/authRoute');
const productosRoute = require('./Routes/productosRoute');
const clientesRouter = require('./Routes/clientesRouter');
const provinciasRouter = require('./Routes/provinciasRouter');
const departamentosRouter = require('./Routes/departamentosRouter');
const municipiosRouter = require('./Routes/municipiosRouter');
const direccionesRouter = require('./Routes/direccionesRouter');
const personasRouter = require('./Routes/personasRouter');
const rolesRouter = require('./Routes/rolesRouter');

const categoriasRouter = require('./Routes/categoriasRouter');
const subcategoriasRouter = require('./Routes/subcategoriasRouter');
const tiposRouter = require('./Routes/tiposRouter');
const marcasRouter = require('./Routes/marcasRouter');
const coloresRouter = require('./Routes/coloresRouter');
const capacidadesRouter = require('./Routes/capacidadesRouter');
const dimensionesRouter = require('./Routes/dimensionesRouter');
const potenciasRouter = require('./Routes/potenciasRouter');
const materialesRouter = require('./Routes/materialesRouter');
const preciosRouter = require('./Routes/preciosRouter');
const ofertasRouter = require('./Routes/ofertasRouter');

const articulosRouter = require('./Routes/articulosRouter');
const carritosRouter = require('./Routes/carritosRouter');
const carritoArticulosRouter = require('./Routes/carritoArticulosRouter');
const metodosPagoRouter = require('./Routes/metodosPagoRouter');
const pedidosRouter = require('./Routes/pedidosRouter');
const pagosRouter = require('./Routes/pagosRouter');
const detallePedidosRouter = require('./Routes/detallePedidosRouter');


const app = express();

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Ensure a demo users file exists so auth has something to check against.
try {
    const modelsDir = path.join(__dirname, 'models');
    if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });
    const usersFile = path.join(modelsDir, 'usuarios.json');
    if (!fs.existsSync(usersFile)) {
        const demoHash = bcrypt.hashSync('admin123', 10);
        const demo = [{ id: 1, email: 'admin', password: demoHash }];
        fs.writeFileSync(usersFile, JSON.stringify(demo, null, 2));
        console.log('Created demo user at', usersFile);
    }
} catch (err) {
    console.error('Error ensuring demo users file', err);
}

// allow CORS with credentials so frontend can send/receive cookies
app.use(cors({ origin: true, credentials: true }));

// parse cookies
app.use(cookieParser());

app.use(express.json());


app.use ((req, res, next) => {
    console.log(`\n📍 ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`   Body:`, JSON.stringify(req.body));
    }
    next();
});

// Mount API routes under /api for consistency with frontend proxy
app.use('/api/usuarios', usuariosRoute);
app.use('/api', chatRoute);
app.use('/api/auth', authRoute);
app.use('/api/productos', productosRoute);
app.use('/api', clientesRouter);

// Routers generados por entidad
app.use('/api', provinciasRouter);
app.use('/api', departamentosRouter);
app.use('/api', municipiosRouter);
app.use('/api', direccionesRouter);
app.use('/api', personasRouter);
app.use('/api', rolesRouter);

app.use('/api', categoriasRouter);
app.use('/api', subcategoriasRouter);
app.use('/api', tiposRouter);
app.use('/api', marcasRouter);
app.use('/api', coloresRouter);
app.use('/api', capacidadesRouter);
app.use('/api', dimensionesRouter);
app.use('/api', potenciasRouter);
app.use('/api', materialesRouter);
app.use('/api', preciosRouter);
app.use('/api', ofertasRouter);

app.use('/api', articulosRouter);
app.use('/api', carritosRouter);
app.use('/api', carritoArticulosRouter);
app.use('/api', metodosPagoRouter);
app.use('/api', pedidosRouter);
app.use('/api', pagosRouter);
app.use('/api', detallePedidosRouter);

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000");
}   );

