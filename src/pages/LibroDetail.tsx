import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router";
import { useAuth } from "../hooks/useAuth"; 
import { Libro } from "../models/libro";
import { LibroService } from "../services/LibrosService";
import { CarritoService } from "../services/CarritoService";
import { Menu } from "../components/Menu";
import { URLS } from "../navigation/constants";
//quitar el boton eliminar solo tiene que tener el boton comprar
const LibroDetail = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState<Libro | null>(null);
  const carritoService = new CarritoService();
  const navigate = useNavigate();
  const { email } = useAuth(); // <- aquí validamos autenticación

  useEffect(() => {
    if (id) {
      new LibroService()
        .getLibro(parseInt(id))
        .then((data) => setLibro(data))
        .catch((error) => console.error("Error al cargar el libro:", error));
    }
  }, [id]);

  const handleComprar = async () => {
    if (!email) {
      alert("Debes iniciar sesión para comprar.");
      navigate(URLS.LOGIN);
      return;
    }

    if (id) {
      try {
        await carritoService.agregarLibroAlCarrito(parseInt(id));
        alert(`"${libro?.titulo}" fue agregado al carrito.`);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  

  if (!libro) return <div className="p-4">Cargando libro...</div>;

  return (
    <>
        <Menu />
    <div className="container mx-auto p-6 max-w-xl bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{libro.titulo}</h1>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Precio:</strong> Bs. {libro.precio}</p>
      <p><strong>ISBN:</strong> {libro.isbn}</p>
      <p className="mt-4"><strong>Descripción:</strong></p>
      <p>{libro.descripcion}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleComprar}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Comprar
        </button>
      </div>
    </div>
    </>
  );

};

export default LibroDetail;
