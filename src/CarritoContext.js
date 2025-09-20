import React, { createContext, useContext, useState, useEffect } from "react";
const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("carrito")) || [];
    const normalized = raw.map((item) => ({
      ...item,
      precio: Number(item.precio) || 0,
      cantidad: Number(item.cantidad) || 1,
    }));
    setCarrito(normalized);
    localStorage.setItem("carrito", JSON.stringify(normalized));
  }, []);

  const guardar = (data) => {
    setCarrito(data);
    localStorage.setItem("carrito", JSON.stringify(data));
  };

  const agregarAlCarrito = (item) => {
    const nuevoItem = {
      ...item,
      precio: Number(item.precio) || 0,
      cantidad: Number(item.cantidad) || 1,
    };

    const data = [...carrito];
    const existente = data.find((libro) => libro.titulo === nuevoItem.titulo);

    if (existente) {
      existente.cantidad = (Number(existente.cantidad) || 0) + nuevoItem.cantidad;
    } else {
      data.push(nuevoItem);
    }

    guardar(data);
  };

  const eliminarDelCarrito = (titulo) => {
    const data = carrito.filter((item) => item.titulo !== titulo);
    guardar(data);
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