import { useState } from "react";
import "../estilos/estilos.css";

function Login() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registro, setRegistro] = useState({ nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");

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
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* HEADER FIJO ROSA */}
      <header>
        <a href="/">
          <img src="/fotos-libros/Adobe Express - file.png" alt="Logo" className="logo" />
        </a>
        <h1>Mi cuenta</h1>
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
            href="https://www.facebook.com/profile.php?id=61574672454293"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a href="/carrito">Carrito</a>
        </nav>
      </header>

      {/* FORMULARIO LOGIN/REGISTRO */}
      <main
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "40px 50px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: "360px",
            textAlign: "center",
          }}
        >
          {/* Pestañas */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={() => setModo("login")}
              style={{
                border: "none",
                background: "none",
                fontSize: "18px",
                color: "#7E57C2",
                fontWeight: modo === "login" ? "bold" : "normal",
                borderBottom: modo === "login" ? "3px solid #5E35B1" : "none",
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
                color: "#7E57C2",
                fontWeight: modo === "registro" ? "bold" : "normal",
                borderBottom: modo === "registro" ? "3px solid #5E35B1" : "none",
                paddingBottom: "5px",
                cursor: "pointer",
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Formularios */}
          {modo === "login" ? (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="email"
                placeholder="Tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#DA968B",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ACCESO
              </button>
              <a
                href="#"
                style={{ marginTop: "10px", color: "#7E57C2", fontSize: "14px" }}
              >
                ¿Olvidaste la contraseña?
              </a>
            </form>
          ) : (
            <form
              onSubmit={handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                type="text"
                placeholder="Nombre completo"
                value={registro.nombre}
                onChange={(e) =>
                  setRegistro({ ...registro, nombre: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registro.email}
                onChange={(e) =>
                  setRegistro({ ...registro, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registro.password}
                onChange={(e) =>
                  setRegistro({ ...registro, password: e.target.value })
                }
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#DA968B",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                REGISTRARSE
              </button>
            </form>
          )}

          {mensaje && (
            <p
              style={{
                marginTop: "20px",
                fontWeight: "bold",
                color: mensaje.includes("✅") ? "green" : "red",
              }}
            >
              {mensaje}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Login;
