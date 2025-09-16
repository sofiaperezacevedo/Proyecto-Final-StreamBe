import { useEffect, useState } from "react";
import "../estilos/carrito.css";

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  useEffect(() => {
    mostrarCarrito();
  }, []);

  const mostrarCarrito = () => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);

    const nuevoTotal = data.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

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

  return (
    <div className="carrito-container">
      <header>
        <a href="/">
          <img src="/fotos-libros/Adobe Express - file.png" alt="Logo" className="logo" />
        </a>
        <h1>Carrito de Compras</h1>
        <nav>
          <a href="/">Venta</a>
          <a href="/como-comprar">¿Cómo comprar?</a>
          <a href="/quienes-somos">¿Quiénes somos?</a>
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
            Carrito (<span>{carrito.length}</span>)
          </a>
        </nav>
      </header>

      <main>
        <section id="carrito">
          <h2>Tu carrito</h2>
          <div id="carrito-lista">
            {carrito.map((item, index) => (
              <div className="item-carrito" key={index}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                  <p style={{ minWidth: "80px", textAlign: "right", margin: 0 }}>
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
            ))}
          </div>

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
            📩 Al tocar “Reservar”, se copiará el mensaje automáticamente para
            que lo envíes por Instagram.
          </p>

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
              ✅ El mensaje fue copiado. Pegalo en el chat de Instagram que se
              abrió.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Carrito;
