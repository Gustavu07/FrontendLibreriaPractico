import React, { useEffect, useState } from "react";
import { Carrito } from "../models/carrito";
import { CarritoService } from "../services/CarritoService";
import { Menu } from "../components/Menu";
import { CompraService } from "../services/compraService";
import { useNavigate } from "react-router";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState<Carrito[]>([]);
  const carritoService = new CarritoService();
  const compraService = new CompraService();
  const navigate = useNavigate();

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const data = await carritoService.getCarrito();
      setCarrito(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      alert("Error al cargar el carrito.");
    }
  };

  const eliminar = async (id: number) => {
    try {
      await carritoService.eliminarDelCarrito(id);
      cargarCarrito(); // recargar después de eliminar
    } catch (error: any) {
      alert(error.message);
    }
  };

  const finalizarCompra = async () => {
    try {
      const data = await compraService.comprar(); // POST /compras/comprar/
      const compraId = data.compra_id;
      navigate(`/pago/${compraId}`);
    } catch (error: any) {
      alert("No se pudo completar la compra: " + error.message);
    }
  };

  if (carrito.length === 0) {
    return <div className="p-4">Tu carrito está vacío.</div>;
  }

  return (
    <>
        <Menu />
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <ul className="space-y-4">
        {carrito.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.libro_titulo}</p>
              {/* Si no tienes precio en la API, puedes eliminar esta línea o agregarlo si decides enviar el precio */}
              {/* <p className="text-sm">Bs. {item.libro.precio}</p> */}
            </div>
            <button
              onClick={() => eliminar(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <button
          onClick={finalizarCompra}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
    </>
  );
};

export default CarritoPage;
