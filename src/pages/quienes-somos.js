import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function QuienesSomos() {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario")) || null;
    setCarrito(carritoGuardado);
    setUsuario(usuarioGuardado);
  }, []);

  const manejarCarrito = (e) => {
    e.preventDefault();
    if (!usuario) {
      alert("Debés iniciar sesión o registrarte para usar el carrito 🛒");
      navigate("/login");
    } else {
      navigate("/carrito");
    }
  };

  return (
    <>
      <header
        className="header-fijo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          padding: "0 30px",
        }}
      >
        {/* 🔹 Logo */}
        <a href="/">
          <img
            src="/fotos-libros/Adobe Express - file.png"
            alt="Logo"
            className="logo"
            style={{ height: "45px" }}
          />
        </a>

        {/* 🔹 Título centrado */}
        <div className="titulo" style={{ flex: "1", textAlign: "center" }}>
          <h1 style={{ color: "white", fontWeight: "700", margin: 0 }}>
            Venta de Libros Usados
          </h1>
        </div>

        {/* 🔹 Navegación */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
          }}
        >
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

          {/* Usuario logueado o login */}
          {usuario ? (
            <span
              style={{
                color: "#37224F",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              👋 Hola,{" "}
              <span style={{ fontWeight: "700" }}>
                {usuario.nombre.split(" ")[0]}
              </span>
            </span>
          ) : (
            <Link to="/login" style={{ color: "#37224F" }}>
              Iniciar sesión
            </Link>
          )}

          {/* Carrito */}
          <a href="/carrito" onClick={manejarCarrito}>
            Carrito (<span>{carrito.length}</span>)
          </a>
        </nav>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto 40px auto",
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.08)",
          marginTop: "120px",
        }}
      >
        <h2 style={{ color: "#3D4171", fontSize: "28px", marginBottom: "20px" }}>
          📚 ¿Quiénes somos?
        </h2>

        <p style={{ color: "#444", lineHeight: "1.6", fontSize: "16px" }}>
          Somos un pequeño proyecto independiente 💫 dedicado a dar una segunda vida a libros usados.
          Creemos que cada libro tiene una historia única 📖 y merece ser leído muchas veces.
        </p>

        <h3 style={{ color: "#37224F", marginTop: "30px", fontSize: "20px" }}>
          📘 Nuestra historia
        </h3>
        <p style={{ color: "#444", lineHeight: "1.6", fontSize: "16px" }}>
          Empezamos vendiendo libros que ya habíamos leído 😊, y pronto descubrimos que muchas personas estaban
          buscando libros en buen estado a buen precio. Así nació esta tiendita 💕.
        </p>

        <h3 style={{ color: "#37224F", marginTop: "30px", fontSize: "20px" }}>
          🛍️ ¿Cómo funciona?
        </h3>
        <p style={{ color: "#444", lineHeight: "1.6", fontSize: "16px" }}>
          Reservás un libro desde nuestra web y nos contactás por Instagram para coordinar la entrega 📦.
          Hacemos entregas en persona y aceptamos efectivo 💵 o Mercado Pago 💳.
        </p>
      </main>
    </>
  );
}
