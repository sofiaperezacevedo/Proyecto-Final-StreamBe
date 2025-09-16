import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function QuienesSomos() {
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("carrito-contador");
    if (contador) contador.textContent = carrito.length;
  }, []);

  return (
    <>
      <header className="header-fijo">
        <a href="/">
          <img src="/fotos-libros/Adobe Express - file.png" alt="Logo" className="logo" />
        </a>

        <div className="titulo">
          <h1>Venta de Libros Usados</h1>
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
          <a href="/#carrito">
            Carrito (<span id="carrito-contador">0</span>)
          </a>
        </nav>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "120px auto 40px auto",
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.08)",
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
