import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import libros from "../data/libros";
import "../estilos/estilos.css";
import "../estilos/carrito.css";

// 📌 Diccionario de sinopsis manuales
const sinopsisManual = {
  "El Club de los Psicópatas": `Un thriller psicológico donde un criminal brillante y metódico se enfrenta a un joven novato del FBI en un duelo de inteligencia e instintos.`,
  "Saga Asylum": `Incluye los 7 libros de la saga Asylum. Misterio, terror psicológico y un ambiente inquietante.`,
  "Tiempo de Dragones": `En un mundo fantástico, un grupo de jóvenes héroes debe proteger un legado antiguo mientras enfrentan dragones y descubren su verdadero destino.`,
  "184": `Una exploración introspectiva de la identidad urbana contemporánea, mezclando poesía y relatos cortos ambientados en Buenos Aires.`,
  "Harry Potter La Piedra Filosofal": `El inicio de la saga: un niño huérfano descubre que es mago e ingresa a Hogwarts, donde enfrentará aventuras, amistad y su primer enfrentamiento con Voldemort.`,
  "El bosque de cosas perdidas": `Una joven viaja a un misterioso bosque donde los deseos perdidos cobran vida, revelando secretos oscuros y conexiones profundas con el pasado.`,
  "Locura en la Matinee": `Una comedia dramática que sigue a una troupe de teatro amateur en una noche de locura y revelaciones inesperadas tras bambalinas.`,
  "La matriarca, el barón y la sierva": `Una historia histórica repleta de tensiones de poder, secretos familiares y amores prohibidos en una mansión señorial.`,
  "Poet X": `Una poderosa novela en verso sobre una adolescente que encuentra voz y identidad a través de la poesía mientras enfrenta conflictos culturales y personales.`,
  "Imperfecto": `Ariel es un alumno modelo obsesionado con ingresar a Harvard. Cuando reprueba un examen clave, conoce a un tutor que lo obliga a replantearse sus prioridades y descubrir que la vida sucede más allá del perfeccionismo académico.`,
  "Más allá de las estrellas": `Un viaje romántico entre dos personas que se reencuentran tras años, cuestionando el destino y las segundas oportunidades.`,
  "Given 1": `Primer volumen de manga gay donde se exploran emociones profundas, música y el comienzo de una relación entre dos chicos conectados por su pasión.`,
  "Given 2": `El desarrollo de la relación sigue avanzando mientras aparecen conflictos internos y nuevas emociones.`,
  "Pack Given 1 y 3": `Incluye los tomos 1 y 3 de la saga Given. Una historia sobre música, amor y segundas oportunidades.`,
  "Banana Fish 1": `Un joven se adentra en el oscuro mundo criminal de Nueva York mientras desvela un complot y su propia identidad.`,
  "Banana Fish 2": `La trama se intensifica con acción, traición y la lucha por la libertad en una poderosa continuación.`,
  "Pack Banana Fish 1 y 2": `Incluye los tomos 1 y 2 de Banana Fish. Suspenso, acción y emociones intensas.`,
  "Blue Exorcist 2": `Rin aprende a lidiar con su destino como exorcista bajo la sombra de su padre demoníaco mientras enfrenta nuevos peligros.`,
  "Ouran High School Host Club 1": `Una comedia romántica en un colegio de élite donde un club de anfitriones cambia la vida de una estudiante becada.`,
  "Ouran High School Host Club 2": `El club continúa sus extravagantes encuentros mientras las relaciones se profundizan y las risas no faltan.`,
  "Pack Ouran High School Host Club 1 y 2": `Incluye los tomos 1 y 2 de Ouran High School Host Club. Risas, romance y situaciones alocadas.`,
  "Me Dijiste Para Siempre": `Un romance dramático entre dos jóvenes que prometen amor eterno, aunque la vida los pone a prueba más de lo esperado.`,
  "Aoha Ride 1": `Un shojo dulce sobre segundas oportunidades: una chica se reencuentra con su primer amor, descubriendo que ambos han cambiado.`,
  "Un Año Movido": `Frank y sus dos amigos viven en el mismo edificio, van juntos a clase y son inseparables. La llegada de Félix, un chico solitario y extraño, provocará importantes cambios para todos.`,
  "Una Familia Anormal": `Lyna y Melina van a pasar el verano a casa de su abuela. Pero lo que imaginaron como unas vacaciones aburridas, se convierte en una delirante búsqueda del tesoro.`,
  "¿Quién Anda Ahí?": `Lincoln quiere captar pruebas de actividad paranormal en su casa para enviarlas a su programa de televisión favorito, "ASCO".`,
  "Martina y La Puerta Mágica": `Hay un agujero en la pared de mi cuarto y les prometo que NO es culpa mía. Mejor investigo lo que hay detrás antes de que mis padres se enteren.`,
  "El Bromista Invisible": `En la clase de Nino y Mila aparece un payaso misterioso que juega bromas pesadas.`,
  "Las aventuras de Tom Sawyer": `Clásica novela donde Tom vive aventuras junto a Huckleberry Finn a orillas del Misisipi; una historia sobre infancia, libertad y amistad.`,
  "La hechicera del mediodía": `Edmond y Harold viven junto a un bosque donde se cuentan historias de una hechicera. Cuando chicos empiezan a desaparecer, investigan leyendas y descubren fuerzas oscuras.`,
  "Riusplay y el Hechizo de la Luna Llena": `Una noche de luna llena, Rius entrena para ser caballero pero es atacado por hombres lobo.`,
  "La Cámara Imposible": `Los hermanos Mateo, Hugo y Daniela encuentran una cámara con poderes inesperados que desencadena desastres y diversión.`,
  "Caídos del Mapa 1": `Cuatro chicos de séptimo grado planean escaparse de la escuela, pero se cuela Miriam en su plan.`,
  "Underfail": `En un mundo subterráneo donde humanos encerraron a monstruos, Dei lucha por liberarlos.`,
  "Edipo rey / Hamlet": `Dos tragedias clásicas que exploran destino, culpa, venganza y dilemas morales.`,
  "Las Historias de Simón": `Simón es un nene frágil, dulce y sensible, capaz de preocuparse y de preguntarse cosas poco comunes.`,
  "Los Compas Perdidos en el Espacio": `Mike, Trolli y Timba se embarcan en una aventura intergaláctica con humor y desafíos.`,
  "Los Compas y la Cámara del Tiempo": `Los Compas descubren una misteriosa cámara del tiempo que los transporta a distintas épocas.`,
};

// 📌 Galería de imágenes (para modal/zoom)
const galeriaPorLibro = {
  "Harry Potter La Piedra Filosofal": ["/fotos-libros/harry potter1.jpg", "/fotos-libros/harry potter2.jpg", "/fotos-libros/harry potter3.jpg"],
  "Imperfecto": ["/fotos-libros/imperfecto1.jpg", "/fotos-libros/imperfecto2.jpg", "/fotos-libros/imperfecto3.jpg"],
  "184": ["/fotos-libros/n1.jpg", "/fotos-libros/n2.jpg", "/fotos-libros/n3.jpg"],
  "El bosque de cosas perdidas": ["/fotos-libros/bosque1.jpg", "/fotos-libros/bosque2.jpg", "/fotos-libros/bosque3.jpg"],
  "Más allá de las estrellas": ["/fotos-libros/estrellas1.jpg", "/fotos-libros/estrellas2.jpg", "/fotos-libros/estrellas3.jpg"],
  "El Club de los Psicópatas": ["/fotos-libros/john1.jpg", "/fotos-libros/john2.jpg", "/fotos-libros/john3.jpg"],
  "La matriarca, el barón y la sierva": ["/fotos-libros/matriarca1.jpg", "/fotos-libros/matriarca2.jpg", "/fotos-libros/matriarca3.jpg"],
  "Blue Exorcist 2": ["/fotos-libros/blue1.jpg", "/fotos-libros/blue2.jpg", "/fotos-libros/blue3.jpg"],
  "Martina y La Puerta Mágica": ["/fotos-libros/marti1.jpg", "/fotos-libros/marti2.jpg", "/fotos-libros/marti3.jpg"],
  "¿Quién Anda Ahí?": ["/fotos-libros/nick1.jpg", "/fotos-libros/nick2.jpg", "/fotos-libros/nick3.jpg"],
  "Un Año Movido": ["/fotos-libros/año1.jpg", "/fotos-libros/año2.jpg", "/fotos-libros/año3.jpg"],
  "Una Familia Anormal": ["/fotos-libros/lyna1.jpg", "/fotos-libros/lyna2.jpg", "/fotos-libros/lyna3.jpg"],
  "Tiempo de Dragones": ["/fotos-libros/dragon1.jpg", "/fotos-libros/dragon2.jpg", "/fotos-libros/dragon3.jpg"],
  "Caídos del Mapa 1": ["/fotos-libros/mapa1.jpg", "/fotos-libros/mapa2.jpg", "/fotos-libros/mapa3.jpg"],
  "El Bromista Invisible": ["/fotos-libros/brom1.jpg", "/fotos-libros/brom2.jpg", "/fotos-libros/brom3.jpg"],
  "Aoha Ride 1": ["/fotos-libros/aoha1.jpg", "/fotos-libros/aoha2.jpg", "/fotos-libros/aoha3.jpg"],
  "Me Dijiste Para Siempre": ["/fotos-libros/siempre1.jpg", "/fotos-libros/siempre2.jpg", "/fotos-libros/siempre3.jpg"],
  "Locura en la Matinee": ["/fotos-libros/locura1.jpg", "/fotos-libros/locura2.jpg", "/fotos-libros/locura3.jpg"],
  "Underfail": ["/fotos-libros/under1.jpg", "/fotos-libros/under2.jpg", "/fotos-libros/under3.jpg"],
  "La Cámara Imposible": ["/fotos-libros/crazy1.jpg", "/fotos-libros/crazy2.jpg", "/fotos-libros/crazy3.jpg"],
  "Ouran High School Host Club 1": ["/fotos-libros/ouran1.jpg", "/fotos-libros/ouran2.jpg", "/fotos-libros/ouran3.jpg"],
  "Ouran High School Host Club 2": ["/fotos-libros/ouran21.jpg", "/fotos-libros/ouran22.jpg", "/fotos-libros/ouran23.jpg"],
  "Pack Ouran High School Host Club 1 y 2": ["/fotos-libros/ouran-pack1.jpg", "/fotos-libros/ouran-pack2.jpg", "/fotos-libros/ouran-pack3.jpg"],
  "La hechicera del mediodía": ["/fotos-libros/mediodia1.jpg", "/fotos-libros/mediodia2.jpg", "/fotos-libros/mediodia3.jpg"],
  "Riusplay y el Hechizo de la Luna Llena": ["/fotos-libros/rius1.jpg", "/fotos-libros/rius2.jpg", "/fotos-libros/rius3.jpg"],
  "Given 1": ["/fotos-libros/given1.jpg", "/fotos-libros/given12.jpg", "/fotos-libros/given13.jpg"],
  "Given 2": ["/fotos-libros/given31.jpg", "/fotos-libros/given32.jpg", "/fotos-libros/given33.jpg"],
  "Pack Given 1 y 3": ["/fotos-libros/given-pack1.jpg", "/fotos-libros/given-pack2.jpg", "/fotos-libros/given-pack3.jpg"],
  "Banana Fish 1": ["/fotos-libros/banana1.jpg", "/fotos-libros/banana2.jpg", "/fotos-libros/banana3.jpg"],
  "Banana Fish 2": ["/fotos-libros/banana21.jpg", "/fotos-libros/banana22.jpg", "/fotos-libros/banana23.jpg"],
  "Pack Banana Fish 1 y 2": ["/fotos-libros/banana-pack1.jpg", "/fotos-libros/banana-pack2.jpg", "/fotos-libros/banana-pack3.jpg"],
  "Las Historias de Simón": ["/fotos-libros/simon.jpg", "/fotos-libros/simon2.jpg", "/fotos-libros/simon3.jpg"],
  "Los Compas Perdidos en el Espacio": ["/fotos-libros/compas-espacio.jpg", "/fotos-libros/compas-espacio2.jpg", "/fotos-libros/compas-espacio3.jpg"],
  "Los Compas y la Cámara del Tiempo": ["/fotos-libros/compas-tiempo.jpg", "/fotos-libros/compas-tiempo2.jpg", "/fotos-libros/compas-tiempo3.jpg"],
  "Las aventuras de Tom Sawyer": ["/fotos-libros/tom.jpg", "/fotos-libros/tom2.jpg", "/fotos-libros/tom3.jpg"],
  "Edipo rey / Hamlet": ["/fotos-libros/edipo.jpg", "/fotos-libros/edipo2.jpg", "/fotos-libros/edipo3.jpg"],
  "Saga Asylum": ["/fotos-libros/saga1.jpg", "/fotos-libros/saga2.jpg", "/fotos-libros/saga3.jpg", "/fotos-libros/saga4.jpg", "/fotos-libros/saga5.jpg"]
};

const Producto = () => {
  const location = useLocation();
  const [libro, setLibro] = useState(null);
  const [imagenesLibro, setImagenesLibro] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [zoomActivo, setZoomActivo] = useState(false);
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const titulo = params.get("titulo");
    const autor = params.get("autor");
    const genero = params.get("genero");
    const tapa = params.get("tapa");
    const idioma = params.get("idioma");
    const precio = parseFloat(params.get("precio")) || 0;

    const img = decodeURIComponent(params.get("img") || "");

    setLibro({ titulo, autor, genero, tapa, idioma, precio, img });
    setImagenesLibro(galeriaPorLibro[titulo] || [img]);

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, [location.search]);

  const abrirCarrusel = (indice = 0) => {
    setIndiceActual(indice);
    document.getElementById("modal").style.display = "flex";
  };

  const cambiarImagen = (direccion) => {
    setIndiceActual((prev) => (prev + direccion + imagenesLibro.length) % imagenesLibro.length);
  };

  const cerrarModal = () => {
    document.getElementById("modal").style.display = "none";
    setZoomActivo(false);
  };

  const toggleZoom = () => {
    setZoomActivo(!zoomActivo);
    setPosicion({ x: 0, y: 0 });
  };

  const manejarMovimiento = (e) => {
    if (!zoomActivo) return;
    const img = e.target.getBoundingClientRect();
    const x = ((e.clientX - img.left) / img.width) * 100;
    const y = ((e.clientY - img.top) / img.height) * 100;
    setPosicion({ x, y });
  };

  const agregarAlCarrito = (libroAgregado) => {
    let carritoNuevo = JSON.parse(localStorage.getItem("carrito")) || [];
    const libroConPrecio = {
      ...libroAgregado,
      precio: Number(libroAgregado.precio) || 0,
      cantidad: 1,
    };
    if (!carritoNuevo.some((item) => item.titulo === libroConPrecio.titulo)) {
      carritoNuevo.push(libroConPrecio);
      localStorage.setItem("carrito", JSON.stringify(carritoNuevo));
      setCarrito(carritoNuevo);
    }
    alert(`${libroConPrecio.titulo} agregado al carrito`);
  };


  if (!libro) return <p>Cargando...</p>;

  // 📌 Sugerencias: mismo autor o mismo género
  const generosActuales = libro.genero ? libro.genero.split(",").map((g) => g.trim()) : [];
  const sugerencias = libros
    .filter((s) => {
      if (s.titulo === libro.titulo) return false;
      const mismoAutor = s.autor === libro.autor;
      const comparteGenero = Array.isArray(s.genero) && generosActuales.some((g) => s.genero.includes(g));
      return mismoAutor || comparteGenero;
    })
    .slice(0, 30);

  return (
    <>
      {/* HEADER */}
      <header className="header-fijo">
        <Link to="/">
          <img src="/fotos-libros/Adobe Express - file.png" alt="Logo" className="logo" />
        </Link>
        <div className="titulo">
          <h1>Venta de Libros Usados</h1>
        </div>
        <nav>
          <Link to="/">Venta</Link>
          <Link to="/como-comprar">¿Cómo comprar?</Link>
          <Link to="/quienes-somos">¿Quiénes somos?</Link>
          <a href="https://www.instagram.com/librosusados.munro/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61574672454293&mibextid=ZbWKwL" target="_blank" rel="noreferrer">Facebook</a>
          <Link to="/carrito">Carrito (<span>{carrito.length}</span>)</Link>
        </nav>
      </header>

      <div id="producto-detalle" className="detalle-container">
        {/* Galería */}
        <div className="galeria">
          {imagenesLibro.map((src, index) => (
            <img key={index} src={src} alt={libro.titulo} onClick={() => abrirCarrusel(index)} />
          ))}
        </div>

        {/* Detalles */}
        <h2>{libro.titulo}</h2>
        <p><strong>Autor:</strong> {libro.autor}</p>
        <p><strong>Géneros:</strong> {libro.genero}</p>
        <p><strong>Tapa:</strong> {libro.tapa}</p>
        <p><strong>Idioma:</strong> {libro.idioma}</p>
        <p><strong>Precio:</strong> ${libro.precio}</p>

        {/* Sinopsis con estilo */}
        <div className="sinopsis">
          <strong>Sinopsis:</strong><br />
          {sinopsisManual[libro.titulo] || "Sinopsis no disponible."}
        </div>

        {/* Botón carrito */}
        <button id="agregar-carrito-principal" onClick={() => agregarAlCarrito(libro)}>
          Agregar al carrito
        </button>
      </div>

      {/* Modal */}
      <div id="modal" className="modal">
        <span className="cerrar" onClick={cerrarModal}>×</span>
        <img
          src={imagenesLibro[indiceActual]}
          alt="Imagen ampliada"
          className={zoomActivo ? "zoomed" : ""}
          onClick={toggleZoom}
          onMouseMove={manejarMovimiento}
          style={zoomActivo ? { transformOrigin: `${posicion.x}% ${posicion.y}%`, transform: "scale(2.5)" } : {}}
        />
        <span className="flecha izq" onClick={() => cambiarImagen(-1)}>❮</span>
        <span className="flecha der" onClick={() => cambiarImagen(1)}>❯</span>
      </div>

      {/* 📌 Sección de sugerencias */}
      <div className="sugerencias">
        <h3>También te pueden interesar…</h3>
        <div className="sugerencias-contenedor">
          {sugerencias.map((s, i) => (
            <div key={i} className="sugerencia">
              <Link
                to={`/producto?titulo=${encodeURIComponent(s.titulo)}&autor=${encodeURIComponent(s.autor)}&genero=${encodeURIComponent(Array.isArray(s.genero) ? s.genero.join(",") : s.genero)}&tapa=${encodeURIComponent(s.tapa)}&idioma=${encodeURIComponent(s.idioma)}&precio=${encodeURIComponent(Number(s.precio))}&img=${encodeURIComponent(s.img)}`}>

                <img src={s.img} alt={s.titulo} />
              </Link>
              <h4>{s.titulo}</h4>
              <p>{s.autor}</p>
              <p style={{ fontSize: "13px", color: "#666" }}>
                {Array.isArray(s.genero) ? s.genero.join(", ") : s.genero}
              </p>
              <button onClick={() => agregarAlCarrito(s)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Producto;
