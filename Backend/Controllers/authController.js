const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'clave_super_secreta';
const pathDB = './models/usuarios.json';

function registrar(req, res) {
  try {
    const { email, password } = req.body;
    const usuarios = JSON.parse(fs.readFileSync(pathDB));
    const existe = usuarios.find(u => u.email === email);
    if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

    const hashed = bcrypt.hashSync(password, 10);
    const nuevoUser = { id: usuarios.length + 1, email, password: hashed };
    usuarios.push(nuevoUser);
    fs.writeFileSync(pathDB, JSON.stringify(usuarios, null, 2));
    return res.json({ msg: 'Usuario registrado' });
  } catch (err) {
    console.error('registrar error', err);
    return res.status(500).json({ msg: 'Error interno' });
  }
}

function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'email y password requeridos' });

    const usuarios = JSON.parse(fs.readFileSync(pathDB));
    const user = usuarios.find(u => u.email === email);
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const valido = bcrypt.compareSync(password, user.password);
    if (!valido) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '8h' });

    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: !!isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 8 * 60 * 60 * 1000,
    };

    res.cookie('token', token, cookieOptions);
    return res.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ msg: 'Error interno' });
  }
}

function logout(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', { httpOnly: true, secure: !!isProd, sameSite: isProd ? 'none' : 'lax' });
  return res.json({ ok: true });
}

function me(req, res) {
  // verificarToken middleware attaches req.user
  if (!req.user) return res.status(401).json({ msg: 'No autenticado' });
  return res.json({ user: req.user });
}

module.exports = { registrar, login, logout, me };
