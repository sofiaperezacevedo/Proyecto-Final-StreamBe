const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "librosdb"
});

app.post("/api/register", (req, res) => {
  const { nombre, email, password } = req.body;
  db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error al registrar usuario" });
      res.json({ message: "✅ Usuario registrado correctamente" });
    });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error en el servidor" });
      if (result.length > 0) {
        res.json({ message: "✅ Login exitoso", user: result[0] });
      } else {
        res.json({ message: "❌ Usuario o contraseña incorrectos" });
      }
    });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
