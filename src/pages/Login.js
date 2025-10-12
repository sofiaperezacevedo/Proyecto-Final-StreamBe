import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/estilos.css";

export default function Login() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registro, setRegistro] = useState({ nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("carrito-contador");
    if (contador) contador.textContent = carrito.length;
  }, []);

  // ---- LOGIN ----
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMensaje(data.message || "Error al iniciar sesión");

      if (data.user) {
        localStorage.setItem("usuario", JSON.stringify(data.user));
        window.location.href = "/"; // redirige a inicio
      }
    } catch {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  // ---- REGISTRO ----
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });
      const data = await res.json();
      setMensaje(data.message || "Error al registrarse");
    } catch {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <>
      {/* HEADER igual que en las demás páginas */}
      <header className="header-fijo">
        <a href="/">
          <img
            src="/fotos-libros/Adobe Express - file.png"
            alt="Logo"
            className="logo"
          />
        </a>

        <div className="titulo">
          <h1>Mi cuenta</h1>
        </div>

        <nav>
          <a href="/#lista-libros">Venta</a>
          <Link to="/como-comprar">¿Cómo comprar?</Link>
          <Link to="/quienes-somos">¿Quiénes somos?</Link>
          <a
            href="https://www.instagram.com/librosusados.munro/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61574672454293&mibextid=ZbWKwL"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a href="/carrito">
            Carrito (<span id="carrito-contador">0</span>)
          </a>
        </nav>
      </header>

      {/* LOGIN / REGISTRO */}
      <main
        style={{
          maxWidth: "450px",
          margin: "140px auto 60px auto",
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.08)",
          textAlign: "center",
        }}
      >
        {/* Pestañas */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
          <button
            onClick={() => setModo("login")}
            style={{
              border: "none",
              background: "none",
              fontSize: "18px",
              color: "#37224F",
              fontWeight: modo === "login" ? "bold" : "normal",
              borderBottom: modo === "login" ? "3px solid #DA968B" : "none",
              paddingBottom: "5px",
              marginRight: "25px",
              cursor: "pointer",
            }}
          >
            Acceder
          </button>
          <button
            onClick={() => setModo("registro")}
            style={{
              border: "none",
              background: "none",
              fontSize: "18px",
              color: "#37224F",
              fontWeight: modo === "registro" ? "bold" : "normal",
              borderBottom: modo === "registro" ? "3px solid #DA968B" : "none",
              paddingBottom: "5px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </div>

        {/* FORMULARIOS */}
        {modo === "login" ? (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="email"
              placeholder="Tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-login"
            />
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-login"
            />
            <button type="submit" className="btn-principal">
              ACCESO
            </button>
            <a href="#" style={{ marginTop: "10px", color: "#37224F", fontSize: "14px" }}>
              ¿Olvidaste la contraseña?
            </a>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={registro.nombre}
              onChange={(e) => setRegistro({ ...registro, nombre: e.target.value })}
              required
              className="input-login"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={registro.email}
              onChange={(e) => setRegistro({ ...registro, email: e.target.value })}
              required
              className="input-login"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registro.password}
              onChange={(e) => setRegistro({ ...registro, password: e.target.value })}
              required
              className="input-login"
            />
            <button type="submit" className="btn-principal">
              REGISTRARSE
            </button>
          </form>
        )}

        {mensaje && (
          <p style={{ marginTop: "20px", fontWeight: "bold", color: mensaje.includes("✅") ? "green" : "red" }}>
            {mensaje}
          </p>
        )}
      </main>
    </>
  );
}
