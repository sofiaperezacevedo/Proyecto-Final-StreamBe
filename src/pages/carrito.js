import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/carrito.css";

export default function Carrito() {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensajeCopiado, setMensajeCopiado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario")) || null;
    setCarrito(carritoGuardado);
    setUsuario(usuarioGuardado);

    const nuevoTotal = carritoGuardado.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, []);

  const eliminarDelCarrito = (index) => {
    const data = [...carrito];
    data.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(data));
    setCarrito(data);
    setTotal(data.reduce((acc, item) => acc + item.precio * item.cantidad, 0));
  };

  const finalizarReserva = () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");

    const libros = carrito
      .map((item) => `• ${item.titulo} (x${item.cantidad})`)
      .join("\n");
    const mensaje = `Hola, quiero reservar los siguientes libros:\n${libros}`;

    navigator.clipboard
      .writeText(mensaje)
      .then(() => {
        setMensajeCopiado(true);
        window.open("https://www.instagram.com/librosusados.munro/", "_blank");
      })
      .catch(() => {
        alert("⚠️ No se pudo copiar el mensaje. Copialo manualmente:\n" + mensaje);
        window.open("https://www.instagram.com/librosusados.munro/", "_blank");
      });
  };

  const manejarUsuario = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <>
      <header className="header-fijo">
        <a href="/">
          <img
            src="/fotos-libros/Adobe Express - file.png"
            alt="Logo"
            className="logo"
          />
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

          {/* 👤 Usuario logueado o link de inicio */}
          {usuario ? (
            <a
              href="#"
              onClick={manejarUsuario}
              className="usuario-header"
            >
              👋 Hola, {usuario.nombre.split(" ")[0]}
            </a>
          ) : (
            <Link to="/login" className="usuario-header">
              Iniciar sesión
            </Link>
          )}

          {/* 🛒 Carrito (último siempre) */}
          <a href="/carrito">
            Carrito (<span>{carrito.length}</span>)
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
        <section id="carrito">
          <h2
            style={{
              color: "#3D4171",
              fontSize: "28px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            🛒 Tu carrito
          </h2>

          <div id="carrito-lista">
            {carrito.length === 0 ? (
              <p style={{ textAlign: "center", color: "#555" }}>
                Tu carrito está vacío 🕊️
              </p>
            ) : (
              carrito.map((item, index) => (
                <div className="item-carrito" key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.titulo}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <p style={{ flex: 1, margin: 0 }}>
                      {item.titulo} (x{item.cantidad})
                    </p>
                    <p
                      style={{
                        minWidth: "80px",
                        textAlign: "right",
                        margin: 0,
                      }}
                    >
                      ${item.precio * item.cantidad}
                    </p>
                    <button
                      className="boton-eliminar"
                      onClick={() => eliminarDelCarrito(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {carrito.length > 0 && (
            <>
              <div id="resumen-carrito">
                <span>Total:</span>
                <span id="carrito-total">${total}</span>
              </div>

              <button
                id="btn-finalizar"
                onClick={finalizarReserva}
                disabled={carrito.length === 0}
              >
                Reservar
              </button>

              <p
                id="instruccion-reserva"
                style={{
                  marginTop: "10px",
                  fontSize: "15px",
                  color: "#37224F",
                  textAlign: "center",
                }}
              >
                📩 Al tocar “Reservar”, se copiará el mensaje automáticamente
                para que lo envíes por Instagram.
              </p>
            </>
          )}

          {mensajeCopiado && (
            <div
              id="mensaje-copiado"
              style={{
                marginTop: "15px",
                color: "#37224F",
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#F5E1E2",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              ✅ El mensaje fue copiado. Pegalo en el chat de Instagram que se abrió.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
