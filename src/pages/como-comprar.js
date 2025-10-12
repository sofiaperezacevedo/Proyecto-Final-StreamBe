import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/estilos.css";

export default function ComoComprar() {
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

        {/* 🔹 Navegación alineada a la derecha */}
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

          {/* Usuario logueado o inicio de sesión */}
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
        <h2
          style={{
            color: "#3D4171",
            fontSize: "28px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          🛒 ¿Cómo comprar?
        </h2>

        <ol
          style={{
            paddingLeft: "25px",
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
            Se abrirá nuestro Instagram, y el mensaje con tu pedido ya estará
            copiado para que lo pegues y lo envíes.
          </li>
          <li>
            Tenés 24 horas para coordinar el pago y retiro del libro. Pasado ese
            plazo, la reserva se cancela.
          </li>
          <li>
            ¡Listo! En breve nos estaremos contactando para entregarte tu pedido 📦
          </li>
        </ol>
      </main>
    </>
  );
}
