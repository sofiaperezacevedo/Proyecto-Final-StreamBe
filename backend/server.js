const express = require("express");
const cors = require("cors");
const db = require("./database"); // importamos la base sqlite

const app = express();
app.use(cors());
app.use(express.json());

// 👉 REGISTRO
app.post("/api/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  db.run(sql, [nombre, email, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(400).json({ message: "❌ El email ya está registrado" });
      }
      return res.status(500).json({ message: "❌ Error al registrar usuario" });
    }
    res.json({ message: "✅ Usuario registrado correctamente", id: this.lastID });
  });
});

// 👉 LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  db.get(sql, [email, password], (err, row) => {
    if (err) return res.status(500).json({ message: "Error en el servidor" });
    if (!row) return res.status(401).json({ message: "❌ Usuario o contraseña incorrectos" });

    res.json({ message: "✅ Login exitoso", user: row });
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
