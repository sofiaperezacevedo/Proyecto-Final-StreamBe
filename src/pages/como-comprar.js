import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/estilos.css";

export default function ComoComprar() {
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("carrito-contador");
    if (contador) contador.textContent = carrito.length;
  }, []);

  return (
    <>
      <header className="header-fijo">
        <a href="/">
          <img src="/Adobe Express - file.png" alt="Logo" className="logo" />
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
          <a href="/carrito">
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
          🛒 ¿Cómo comprar?
        </h2>

        <ol
          style={{
            paddingLeft: "20px",
            lineHeight: "1.8",
            fontSize: "16px",
            color: "#37224F",
            textAlign: "left",
          }}
        >
          <li>Explorá nuestro catálogo y elegí los libros que más te gusten 📚</li>
          <li>
            Agregalos al carrito haciendo clic en{" "}
            <strong>“Agregar al carrito”</strong>.
          </li>
          <li>
            Cuando estés listo, accedé al carrito y hacé clic en{" "}
            <strong>“Reservar”</strong>.
          </li>
          <li>
            Se abrirá nuestro Instagram, y el mensaje con tu pedido ya estará copiado para que lo pegues y lo envíes.
          </li>
          <li>
            Tenés 24 horas para coordinar el pago y retiro del libro. Pasado ese plazo, la reserva se cancela.
          </li>
          <li>
            ¡Listo! En breve nos estaremos contactando para entregarte tu pedido 📦
          </li>
        </ol>
      </main>
    </>
  );
}