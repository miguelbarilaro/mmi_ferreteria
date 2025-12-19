const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

function verificarToken(req, res, next) {
  try {
    const token = req.cookies?.token || null;
    if (!token) return res.status(401).json({ msg: 'Token requerido' });
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('verificarToken error', err);
    return res.status(403).json({ msg: 'Token inválido' });
  }
}

module.exports = { verificarToken };
