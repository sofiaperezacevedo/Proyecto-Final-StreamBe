const express = require("express");
const router = express.Router();
const db = require("../database"); 

// Ruta para registrar usuario
router.post("/register", async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    await db.query("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)", [
      nombre,
      email,
      contraseña,
    ]);
    res.status(200).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

module.exports = router;
