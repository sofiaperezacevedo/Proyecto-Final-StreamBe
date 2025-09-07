import { Link } from "react-router-dom";
import "../estilos/estilos.css";

export default function Index() {
    return (
        <main>
            {/* Header */}
            <header className="header-fijo">
                <a href="/">
                    <img src="/Adobe Express - file.png" alt="Logo" className="logo" />
                </a>
                <div className="titulo">
                    <h1>Venta de Libros Usados</h1>
                </div>

                <nav>
                    <Link to="/">Venta</Link>
                    <Link to="/como-comprar">¿Cómo comprar?</Link>
                    <Link to="/quienes-somos">¿Quiénes somos?</Link>
                    <a href="https://www.instagram.com/librosusados.munro/" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.facebook.com/profile.php?id=61574672454293&mibextid=ZbWKwL" target="_blank" rel="noreferrer">Facebook</a>
                    <Link to="/carrito">
                        Carrito (<span id="carrito-contador">0</span>)
                    </Link>
                </nav>
            </header>

            {/* Información preliminar */}
            <section className="informacion-preliminar">
                <div className="informacion-item">
                    <img src="/img/punto.jpg" alt="Ubicación" />
                    <div>
                        <h4>Únicamente punto de encuentro o retiro</h4>
                        <p>Estamos en Zona Norte (Munro). Luego de tu compra coordinamos el lugar.</p>
                    </div>
                </div>

                <div className="informacion-item">
                    <img src="/img/tarjetas.jpg" alt="Pago" />
                    <div>
                        <h4>Diferentes medios de pago</h4>
                        <p>Elegí el que más se acomode a vos</p>
                    </div>
                </div>
            </section>

            {/* Promociones */}
            <section className="seccion-contenedor">
                <h2 className="titulo-promos">🎁 Sagas y Packs</h2>
                <div className="promo-grid">
                    <Promo
                        img="/given-pack1.jpg"
                        titulo="🎤🎸 Pack Given 1 + 3"
                        precio="8000"
                        tachado="10000"
                        link="Pack Given&autor=Natsuki Kizu&genero=Manga, BL&idioma=español&tapa=Blanda&precio=8000&img=img/given-pack1.jpg"
                    />
                    <Promo
                        img="/banana-pack1.jpg"
                        titulo="🍌🐟 Pack Banana Fish 1 y 2"
                        precio="12000"
                        tachado="14000"
                        link="Pack Banana Fish&autor=Akimi Yoshida&genero=Manga, Acción&idioma=español&tapa=Blanda&precio=12000&img=img/banana-pack1.jpg"
                    />
                    <Promo
                        img="/ouran-pack1.jpg"
                        titulo="🏤 Pack Ouran High School Host Club 1 + 2"
                        precio="16000"
                        tachado="20000"
                        link="Pack Ouran High School Host Club&autor=Bisco Hatori&genero=Manga, Romance, Comedia&idioma=español&tapa=blanda&precio=16000&img=img/ouran-pack1.jpg"
                    />
                    <Promo
                        img="/saga.jpg"
                        titulo="🧠💀 Saga Asylum"
                        precio="70000"
                        link="Saga Asylum&autor=Madeleine Roux&genero=Terror, Misterio&idioma=español&tapa=blanda&precio=70000&img=img/saga1.jpg"
                    />
                </div>

            </section>

            {/* Buscador (queda pendiente para funcionalidad en React) */}
            <section className="buscador fade-in" style={{ animationDelay: "0.2s" }}>
                <input type="text" id="busqueda" placeholder="Buscar por título o autor" />
                <input type="number" id="Precio" placeholder="Buscar por precio" />
                <select id="genero">
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

            {/* Lista dinámica de libros: lo implementarás después */}
            <section id="lista-libros"></section>
        </main>
    );
}

// Reutilizable: una tarjeta de promo
function Promo({ img, titulo, precio, tachado, link }) {
    return (
        <div className="promo-item">
            <img src={img} alt={titulo} />
            <div>
                <h3>{titulo}</h3>
                <p>
                    Llevate ambos tomos por <strong>${precio}</strong>{" "}
                    {tachado && <span className="tachado">${tachado}</span>}
                </p>
                <Link
                    className="boton-info"
                    to={`/producto?titulo=${encodeURIComponent(link)}`}
                >
                    Ver pack
                </Link>
            </div>
        </div>
    );
}
