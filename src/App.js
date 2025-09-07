import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index.js";
import Carrito from "./pages/carrito";
import ComoComprar from "./pages/como-comprar";
import QuienesSomos from "./pages/quienes-somos";
import Producto from "./pages/producto";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/como-comprar" element={<ComoComprar />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/producto" element={<Producto />} />
      </Routes>
    </Router>
  );
}

export default App;
