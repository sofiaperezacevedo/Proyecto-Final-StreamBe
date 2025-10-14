import { Link } from "react-router-dom";
import { useCarrito } from "../CarritoContext";
import "../estilos/estilos.css";
import libros from "../data/libros";
import { useState } from "react";

export default function Index() {
    const { carrito, agregarAlCarrito } = useCarrito();
    const [busqueda, setBusqueda] = useState("");
    const [precioMax, setPrecioMax] = useState("");
    const [genero, setGenero] = useState("");
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    function normalizar(str) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    const librosFiltrados = libros.filter((libro) => {
        const coincideBusqueda =
            normalizar(libro.titulo).includes(normalizar(busqueda)) ||
            normalizar(libro.autor).includes(normalizar(busqueda));

        const coincidePrecio =
            precioMax === "" || Number(libro.precio) <= Number(precioMax);

        const coincideGenero =
            genero === "" ||
            (Array.isArray(libro.genero)
                ? libro.genero.some((g) => normalizar(g) === normalizar(genero))
                : normalizar(libro.genero) === normalizar(genero));

        return coincideBusqueda && coincidePrecio && coincideGenero;
    });

    return (
        <main>
            {/* HEADER UNIFICADO */}
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">📚</span>
                    <h1>Venta de Libros Usados</h1>
                </div>
                <nav className="nav-links">
                    <Link to="/">Venta</Link>
                    <Link to="/como-comprar">¿Cómo comprar?</Link>
                    <Link to="/quienes-somos">¿Quiénes somos?</Link>
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Facebook
                    </a>
                    {nombreUsuario ? (
                        <span className="usuario">👋 Hola, {nombreUsuario}</span>
                    ) : (
                        <Link to="/login">Usuario</Link>
                    )}
                    <Link to="/carrito">Carrito ({carrito.length})</Link>
                </nav>
            </header>

            {/* INFORMACIÓN PRELIMINAR */}
            <section className="informacion-preliminar">
                <div className="informacion-item">
                    <img src="/fotos-libros/punto.jpg" alt="Ubicación" />
                    <div>
                        <h4>Únicamente punto de encuentro o retiro</h4>
                        <p>
                            Estamos en Zona Norte (Munro). Luego de tu compra
                            coordinamos el lugar.
                        </p>
                    </div>
                </div>

                <div className="informacion-item">
                    <img src="/fotos-libros/tarjetas.jpg" alt="Pago" />
                    <div>
                        <h4>Diferentes medios de pago</h4>
                        <p>Elegí el que más se acomode a vos</p>
                    </div>
                </div>
            </section>

            {/* PROMOCIONES */}
            <section className="seccion-contenedor">
                <h2 className="titulo-promos">🎁 Sagas y Packs</h2>
                <div className="promo-grid">
                    <Promo
                        img="/fotos-libros/given-pack1.jpg"
                        titulo="Pack Given 1 y 3"
                        precio={8000}
                        tachado={10000}
                        query="titulo=Pack Given 1 y 3&autor=Natsuki Kizu&genero=Manga, BL&idioma=español&tapa=Blanda&precio=8000&img=/fotos-libros/given-pack1.jpg"
                    />
                    <Promo
                        img="/fotos-libros/banana-pack1.jpg"
                        titulo="Pack Banana Fish 1 y 2"
                        precio={12000}
                        tachado={14000}
                        query="titulo=Pack Banana Fish 1 y 2&autor=Akimi Yoshida&genero=Manga, Acción&idioma=español&tapa=Blanda&precio=12000&img=/fotos-libros/banana-pack1.jpg"
                    />
                    <Promo
                        img="/fotos-libros/ouran-pack1.jpg"
                        titulo="Pack Ouran High School Host Club 1 y 2"
                        precio={16000}
                        tachado={20000}
                        query="titulo=Pack Ouran High School Host Club 1 y 2&autor=Bisco Hatori&genero=Manga, Romance, Comedia&idioma=español&tapa=Blanda&precio=16000&img=/fotos-libros/ouran-pack1.jpg"
                    />
                    <Promo
                        img="/fotos-libros/saga.jpg"
                        titulo="Saga Asylum"
                        precio={70000}
                        query="titulo=Saga Asylum&autor=Madeleine Roux&genero=Terror, Misterio&idioma=español&tapa=Blanda&precio=70000&img=/fotos-libros/saga2.jpg"
                    />
                </div>
            </section>

            {/* BUSCADOR */}
            <section
                className="buscador fade-in"
                style={{ animationDelay: "0.2s" }}
            >
                <input
                    type="text"
                    placeholder="Buscar por título o autor"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Buscar por precio"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                />
                <select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                >
                    <option value="">Todos los géneros</option>
                    <option value="accion">Acción</option>
                    <option value="aventura">Aventura</option>
                    <option value="comedia">Comedia</option>
                    <option value="comic">Comic</option>
                    <option value="drama">Drama</option>
                    <option value="fantasia">Fantasía</option>
                    <option value="ficcion">Ficción</option>
                    <option value="humor">Humor</option>
                    <option value="infantil">Infantil</option>
                    <option value="manga">Manga</option>
                    <option value="romance">Romance</option>
                    <option value="suspenso">Suspenso</option>
                    <option value="terror">Terror</option>
                    <option value="thriller">Thriller</option>
                </select>
            </section>

            {/* LISTA DE LIBROS */}
            <section id="lista-libros" className="libros-grid">
                {librosFiltrados.length > 0 ? (
                    librosFiltrados.map((libro, i) => (
                        <div key={i} className="libro-card">
                            <Link
                                to={`/producto?titulo=${encodeURIComponent(
                                    libro.titulo
                                )}&autor=${encodeURIComponent(
                                    libro.autor
                                )}&genero=${encodeURIComponent(
                                    Array.isArray(libro.genero)
                                        ? libro.genero.join(",")
                                        : libro.genero
                                )}&tapa=${encodeURIComponent(
                                    libro.tapa
                                )}&idioma=${encodeURIComponent(
                                    libro.idioma
                                )}&precio=${encodeURIComponent(
                                    libro.precio
                                )}&img=${encodeURIComponent(libro.img)}`}
                            >
                                <img src={libro.img} alt={libro.titulo} />
                            </Link>
                            <h3>{libro.titulo}</h3>
                            <p>
                                <strong>Autor:</strong> {libro.autor}
                            </p>
                            <p>
                                <strong>Género:</strong>{" "}
                                {Array.isArray(libro.genero)
                                    ? libro.genero.join(", ")
                                    : libro.genero}
                            </p>
                            <p>
                                <strong>Tapa:</strong> {libro.tapa}
                            </p>
                            <p>
                                <strong>Idioma:</strong> {libro.idioma}
                            </p>
                            <p>
                                <strong>Precio:</strong> ${libro.precio}
                            </p>
                            <button
                                onClick={() =>
                                    agregarAlCarrito({
                                        ...libro,
                                        precio: Number(libro.precio),
                                    })
                                }
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </section>
        </main>
    );
}

function Promo({ img, titulo, precio, tachado, query }) {
    return (
        <div className="promo-item">
            <img src={img} alt={titulo} />
            <div>
                <h3>{titulo}</h3>
                <p>
                    Llevate ambos tomos por <strong>${precio}</strong>{" "}
                    {tachado && <span className="tachado">${tachado}</span>}
                </p>
                <Link className="boton-info" to={`/producto?${query}`}>
                    Ver pack
                </Link>
            </div>
        </div>
    );
}
