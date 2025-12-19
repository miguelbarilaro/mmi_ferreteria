const express = require("express");
const { registrar, login, logout, me } = require("../Controllers/authController");
const { verificarToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/registro", registrar);
router.post("/login", login);
router.post('/logout', logout);
router.get('/me', verificarToken, me);

router.get("/perfil", verificarToken, (req, res) => {
  res.json({ msg: "Acceso permitido", user: req.user });
});

module.exports = router;
