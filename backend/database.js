const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./libros.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("✅ Base de datos conectada.");
  }
});

// Crear tablas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS carrito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      libro_id TEXT,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);
});

module.exports = db;
