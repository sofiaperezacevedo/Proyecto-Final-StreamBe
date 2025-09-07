import React, { useEffect, useState } from "react";
import "../estilos/estilos.css"; 
import "../estilos/carrito.css"; 

const sinopsisManual = {
  "El Club de los Psicópatas": `Un thriller psicológico donde un criminal brillante y metódico se enfrenta a un joven novato del FBI en un duelo de inteligencia e instintos.`,
  "Saga Asylum": `En el verano previo a la universidad, Dan Crawford asiste a un programa para estudiantes avanzados en la Universidad de New Hampshire. El alojamiento asignado es un antiguo hospital psiquiátrico cerrado hace años. Pronto, Dan y sus nuevos amigos Abby y Jordan descubren que el lugar guarda oscuros secretos y perturbadoras conexiones con ellos mismos. La saga mezcla misterio, terror psicológico y fotografías reales de hospitales psiquiátricos para crear una experiencia inquietante y adictiva.`,
  "Tiempo de Dragones": `En un mundo fantástico, un grupo de jóvenes héroes debe proteger un legado antiguo mientras enfrentan dragones y descubren su verdadero destino.`,
  "184": `Una exploración introspectiva de la identidad urbana contemporánea, mezclando poesía y relatos cortos ambientados en Buenos Aires.`,
  "Harry Potter La Piedra Filosofal": `El inicio de la saga: un niño huérfano descubre que es mago e ingresa a Hogwarts, donde enfrentará aventuras, amistad y su primer enfrentamiento con Voldemort.`,
  "El bosque de cosas perdidas": `Una joven viaja a un misterioso bosque donde los deseos perdidos cobran vida, revelando secretos oscuros y conexiones profundas con el pasado.`,
  "Locura en la Matinee": `Una comedia dramática que sigue a una troupe de teatro amateur en una noche de locura y revelaciones inesperadas tras bambalinas.`,
  "La matriarca, el barón y la sierva": `Una historia histórica repleta de tensiones de poder, secretos familiares y amores prohibidos en una mansión señorial.`,
  "Poet X": `Una poderosa novela en verso sobre una adolescente que encuentra voz y identidad a través de la poesía mientras enfrenta conflictos culturales y personales.`,
  "Imperfecto": `Ariel es un alumno modelo obsesionado con ingresar a Harvard. Cuando reprueba un examen clave, conoce a un tutor que lo obliga a replantearse sus prioridades y descubrir que la vida sucede más allá del perfeccionismo académico. Una historia juvenil sobre salud mental, identidad y el valor de ser imperfecto.`,
  "Más allá de las estrellas": `Un viaje romántico entre dos personas que se reencuentran tras años, cuestionando el destino y las segundas oportunidades.`,

  "Given 1": `Primer volumen de manga gay donde se exploran emociones profundas, música y el comienzo de una relación entre dos chicos conectados por su pasión.`,
  "Given 3": `Continuación del viaje emocional y musical de la banda Given, profundizando en sus vínculos y tambaleos íntimos.`,
  "Pack Given": `Primer volumen de manga gay donde se exploran emociones profundas, música y el comienzo de una relación entre dos chicos conectados por su pasión. Continuación del viaje emocional y musical de la banda Given, profundizando en sus vínculos y tambaleos íntimos.`,
  "Banana Fish 1": `Un joven se adentra en el oscuro mundo criminal de Nueva York mientras desvela un complot y su propia identidad.`,
  "Banana Fish 2": `La trama se intensifica con acción, traición y la lucha por la libertad en una poderosa continuación.`,
  "Pack Banana Fish": `Un joven se adentra en el oscuro mundo criminal de Nueva York mientras desvela un complot y su propia identidad. La trama se intensifica con acción, traición y la lucha por la libertad en una poderosa continuación.`,
  "Blue Exorcist 2": `Rin aprende a lidiar con su destino como exorcista bajo la sombra de su padre demoníaco mientras enfrenta nuevos peligros.`,
  "Ouran High School Host Club 1": `Una comedia romántica en un colegio de élite donde un club de anfitriones cambia la vida de una estudiante becada.`,
  "Ouran High School Host Club 2": `El club continúa sus extravagantes encuentros mientras las relaciones se profundizan y las risas no faltan.`,
  "Pack Ouran High School Host Club": `Una comedia romántica en un colegio de élite donde un club de anfitriones cambia la vida de una estudiante becada. El club continúa sus extravagantes encuentros mientras las relaciones se profundizan y las risas no faltan.`,
  "Me Dijiste Para Siempre": `Un romance dramático entre dos jóvenes que prometen amor eterno, aunque la vida los pone a prueba más de lo esperado.`,
  "Aoha Ride 1": `Un shojo dulce sobre segundas oportunidades: una chica se reencuentra con su primer amor, descubriendo que ambos han cambiado.`,
  "Un Año Movido": `Frank y sus dos amigos viven en el mismo edificio, van juntos a clase y son inseparables. La llegada de Félix, un chico solitario y extraño, la influencia de su nuevo profesor y un campamento en verano con un final inesperado provocarán importantes cambios para todos. ¡Será un año movido!`,

  "Una Familia Anormal": `Lyna y Melina van a pasar el verano a casa de su abuela. Pero lo que imaginaron como unas vacaciones aburridas, se convierte en una delirante búsqueda del tesoro. Un viaje hacia el Gran Desierto de Minuca, la visita a un templo misterioso y una serie de desafíos para rescatar un legado ancestral pondrán a prueba sus fuerzas y su ingenio.`,
  "¿Quién Anda Ahí?": `Lincoln quiere captar pruebas de actividad paranormal en su casa para enviarlas a su programa de televisión favorito, "ASCO" (la Academia Superior de Cazafantasmas Osados). Pero no es fácil cazar a un espíritu escurridizo en una casa con diez niñas revoltosas. Con la ayuda de su mejor amigo, Clyde, Lincoln traza un plan para conseguir sacar a todas sus hermanas de casa. Pero cuando los cazadores acaban cazados, Lincoln descubre de quién es realmente la casa.`,
  "Martina y La Puerta Mágica": `Que conste, esta vez NO HE SIDO YO. Yo estaba preparando un video tranquilamente en mi cuarto cuando lo encontré: hay un agujero en la pared de mi cuarto y les prometo que NO es culpa mía. Claro que, ya que lo he encontrado, mejor investigo lo que hay detrás antes de que mis padres se enteren, ¿no? Porque, ¿y si hay un TESORO escondido? ¡Decidido! Voy a investigar este misterio porque yo NUNCA digo que no a una AVENTURA. ¿Te sumas?`,
  "El Bromista Invisible": `Parece que en la clase de Nino Puzle y Mila hay un payaso al que le encantan las bromas pesadas. Pero no podían sospechar de Elena, una compañera algo tímida que, para tener más amigos haciéndose la simpática, ha puesto en práctica las bromas que ha leído en un libro.`,
  "Las aventuras de Tom Sawyer": `Clásica novela donde Tom vive aventuras junto a Huckleberry Finn a orillas del Misisipi; una historia sobre infancia, libertad y amistad.`,
  "La hechicera del mediodía": `Edmond y Harold viven junto a un antiguo y siniestro bosque en cuyo interior se cuentan historias de una hechicera. Cuando chicos empiezan a desaparecer, investigan leyendas y descubren que ese lugar cobra vida con fuerzas oscuras.`,
  "Riusplay y el Hechizo de la Luna Llena": `Una noche de luna llena, Rius entrena para ser caballero pero es atacado por hombres lobo. Para salvarse, emprende un viaje junto a sus amigos Mike, Trollino y Timba, en busca de ingredientes mágicos para romper la maldición.`,
  "La Cámara Imposible": `Los hermanos Mateo, Hugo y Daniela (conocidos como The Crazy Haacks en YouTube) encuentran una cámara con poderes inesperados que desencadena desastres alucinantes, mucha diversión y lecciones sobre creatividad y confianza.`,
  "Caídos del Mapa 1": `Cuatro chicos de séptimo grado planean escaparse de la escuela, pero se cuela Miriam en su plan. Entre celos, miedos y conflictos familiares, viven una aventura escolar que explora la amistad, el humor y el crecimiento personal.`,
  "Underfail": `En un mundo subterráneo donde humanos encerraron a monstruos, Dei lucha por liberarlos y sortea trampas y criaturas tontas para salvarlos. Una aventura ilustrada cargada de humor y acción.`,
  "Edipo rey / Hamlet": `Dos tragedias clásicas: Edipo Rey explora el destino y la culpa en la tragedia de Sófocles; Hamlet recrea el dilema moral y la venganza en la tragedia de Shakespeare.`,
  "Las Historias de Simón": `Simón es un nene frágil, dulce y sensible, capaz de preocuparse y de preguntarse acerca de cuestiones poco comunes. Con sus por qué desequilibra a las personas mayores y las enfrenta a omisiones que suelen cometer a diario sin darse cuenta.`,
  "Los Compas perdidos en el espacio": `Mike, Trolli y Timba se embarcan en una aventura intergaláctica tras ser teletransportados al espacio por error. Con mucho humor, desafíos y nuevos personajes espaciales, deberán encontrar el camino de regreso a casa enfrentándose a peligros cósmicos.`,
  "Los Compas y la cámara del tiempo": `Los Compas descubren una misteriosa cámara del tiempo que los transporta a distintas épocas históricas. Cada salto temporal trae nuevos problemas, enemigos y muchas risas mientras intentan regresar a su presente sin alterar demasiado el pasado.`,
};

const Producto = () => {
  const [libro, setLibro] = useState(null);
  const [imagenesLibro, setImagenesLibro] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [zoomActivo, setZoomActivo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get("titulo");
    const autor = params.get("autor");
    const genero = params.get("genero");
    const tapa = params.get("tapa");
    const idioma = params.get("idioma");
    const precio = params.get("precio");
    const img = decodeURIComponent(params.get("img") || "");

    setLibro({ titulo, autor, genero, tapa, idioma, precio, img });

    const galeriaPorLibro = {
  "Harry Potter La Piedra Filosofal": ["/img/harry potter1.jpg", "/img/harry potter2.jpg", "/img/harry potter3.jpg"],
  "Imperfecto": ["/img/imperfecto1.jpg", "/img/imperfecto2.jpg", "/img/imperfecto3.jpg"],
  "184": ["/img/n1.jpg", "/img/n2.jpg", "/img/n3.jpg"],
  "El bosque de cosas perdidas": ["/img/bosque1.jpg", "/img/bosque2.jpg", "/img/bosque3.jpg"],
  "Más allá de las estrellas": ["/img/estrellas1.jpg", "/img/estrellas2.jpg", "/img/estrellas3.jpg"],
  "El Club de los Psicópatas": ["/img/john1.jpg", "/img/john2.jpg", "/img/john3.jpg"],
  "La matriarca, el barón y la sierva": ["/img/matriarca1.jpg", "/img/matriarca2.jpg", "/img/matriarca3.jpg"],
  "Blue Exorcist 2": ["/img/blue1.jpg", "/img/blue2.jpg", "/img/blue3.jpg"],
  "Martina y La Puerta Mágica": ["/img/marti1.jpg", "/img/marti2.jpg", "/img/marti3.jpg"],
  "¿Quién Anda Ahí?": ["/img/nick1.jpg", "/img/nick2.jpg", "/img/nick3.jpg"],
  "Un Año Movido": ["/img/año1.jpg", "/img/año2.jpg", "/img/año3.jpg"],
  "Una Familia Anormal": ["/img/lyna1.jpg", "/img/lyna2.jpg", "/img/lyna3.jpg"],
  "Tiempo de Dragones": ["/img/dragon1.jpg", "/img/dragon2.jpg", "/img/dragon3.jpg"],
  "Caídos del Mapa 1": ["/img/mapa1.jpg", "/img/mapa2.jpg", "/img/mapa3.jpg"],
  "El Bromista Invisible": ["/img/brom1.jpg", "/img/brom2.jpg", "/img/brom3.jpg"],
  "Aoha Ride 1": ["/img/aoha1.jpg", "/img/aoha2.jpg", "/img/aoha3.jpg"],
  "Me Dijiste Para Siempre": ["/img/siempre1.jpg", "/img/siempre2.jpg", "/img/siempre3.jpg"],
  "Locura en la Matinee": ["/img/locura1.jpg", "/img/locura2.jpg", "/img/locura3.jpg"],
  "Underfail": ["/img/under1.jpg", "/img/under2.jpg", "/img/under3.jpg"],
  "La Cámara Imposible": ["/img/crazy1.jpg", "/img/crazy2.jpg", "/img/crazy3.jpg"],
  "Ouran High School Host Club 1": ["/img/ouran1.jpg", "/img/ouran2.jpg", "/img/ouran3.jpg"],
  "Ouran High School Host Club 2": ["/img/ouran21.jpg", "/img/ouran22.jpg", "/img/ouran23.jpg"],
  "Pack Ouran High School Host Club": ["/img/ouran-pack1.jpg", "/img/ouran-pack2.jpg", "/img/ouran-pack3.jpg"],
  "La hechicera del mediodía": ["/img/mediodia1.jpg", "/img/mediodia2.jpg", "/img/mediodia3.jpg"],
  "Riusplay y el Hechizo de la Luna Llena": ["/img/rius1.jpg", "/img/rius2.jpg", "/img/rius3.jpg"],
  "Given 1": ["/img/given1.jpg", "/img/given12.jpg", "/img/given13.jpg"],
  "Given 2": ["/img/given31.jpg", "/img/given32.jpg", "/img/given33.jpg"],
  "Pack Given": ["/img/given-pack1.jpg", "/img/given-pack2.jpg", "/img/given-pack3.jpg"],
  "Banana Fish 1": ["/img/banana1.jpg", "/img/banana2.jpg", "/img/banana3.jpg"],
  "Banana Fish 2": ["/img/banana21.jpg", "/img/banana22.jpg", "/img/banana23"],
  "Pack Banana Fish": ["/img/banana-pack1.jpg", "/img/banana-pack2.jpg", "/img/banana-pack3.jpg"],
  "Las Historias de Simón": ["/img/simon.jpg", "/img/simon2.jpg", "/img/simon3.jpg"],
  "Los Compas Perdidos en el Espacio": ["/img/compas-espacio.jpg", "/img/compas-espacio2.jpg", "/img/compas-espacio3.jpg"],
  "Los Compas y la Cámara del Tiempo": ["/img/compas-tiempo.jpg", "/img/compas-tiempo2.jpg", "/img/compas-tiempo3.jpg"],
  "Las aventuras de Tom Sawyer": ["/img/tom.jpg", "/img/tom2.jpg", "/img/tom3.jpg"],
  "Edipo rey / Hamlet": ["/img/edipo.jpg", "/img/edipo2.jpg", "/img/edipo3.jpg"],
  "Saga Asylum": ["/img/saga2.jpg", "/img/saga3.jpg", "/img/saga4.jpg", "/img/saga5.jpg"],
};

    setImagenesLibro(galeriaPorLibro[titulo] || [img]);
  }, []);

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

  const toggleZoom = () => setZoomActivo(!zoomActivo);

  if (!libro) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      {/* Galería */}
      <div className="galeria">
        {imagenesLibro.map((src, index) => (
          <img key={index} src={src} alt="" onClick={() => abrirCarrusel(index)} />
        ))}
      </div>

      {/* Detalles del libro */}
      <h2>{libro.titulo}</h2>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Géneros:</strong> {libro.genero}</p>
      <p><strong>Tapa:</strong> {libro.tapa}</p>
      <p><strong>Idioma:</strong> {libro.idioma}</p>
      <p><strong>Precio:</strong> ${libro.precio}</p>
      <p><strong>Sinopsis:</strong></p>
      <p id="libro-sinopsis">{sinopsisManual[libro.titulo] || "Sinopsis no disponible."}</p>

      {/* Modal */}
      <div id="modal" className="modal">
        <span className="cerrar" onClick={cerrarModal}>×</span>
        <img
          id="modal-img"
          src={imagenesLibro[indiceActual]}
          alt="Imagen ampliada"
          className={zoomActivo ? "zoomed" : ""}
          onClick={toggleZoom}
        />
        <span className="flecha izq" onClick={() => cambiarImagen(-1)}>❮</span>
        <span className="flecha der" onClick={() => cambiarImagen(1)}>❯</span>
      </div>
    </div>
  );
};

export default Producto;
