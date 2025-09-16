import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const agregarAlCarrito = (item) => {
    const data = [...carrito];
    const existente = data.find((libro) => libro.titulo === item.titulo);

    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      data.push(item);
    }

    setCarrito(data);
    localStorage.setItem("carrito", JSON.stringify(data));
  };

  const eliminarDelCarrito = (titulo) => {
    const data = carrito.filter((item) => item.titulo !== titulo);
    setCarrito(data);
    localStorage.setItem("carrito", JSON.stringify(data));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
