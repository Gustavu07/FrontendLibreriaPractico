import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Menu } from "../components/Menu";
import { Libro } from "../models/libro";
import { Genero } from "../models/genero";
import { useNavigate } from "react-router";
import { LibroService } from "../services/LibrosService";
import { GeneroService } from "../services/GeneroService";
import { URLS } from "../navigation/constants";

const LibrosListPublic = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    new GeneroService().getAllGeneros().then(setGeneros);
    obtenerLibros();
  }, []);

  const obtenerLibros = () => {
    new LibroService()
      .getAllLibros()
      .then(setLibros)
      .catch((error) => console.error("Error al obtener los libros:", error));
  };

  const librosFiltrados = generoSeleccionado
    ? libros.filter((libro) =>
        libro.generos?.some((g) => g.id === generoSeleccionado)
      )
    : libros;

  return (
    <>
      <Menu />
      <div className="container mx-auto p-4">
        <Card title="Géneros" className="mb-6 bg-white shadow-md rounded-md">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setGeneroSeleccionado(null)}
              className={`px-4 py-2 rounded ${
                generoSeleccionado === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Todos
            </button>
            {generos.map((genero) => (
              <button
                key={genero.id}
                onClick={() => setGeneroSeleccionado(genero.id)}
                className={`px-4 py-2 rounded ${
                  generoSeleccionado === genero.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {genero.nombre}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Catálogo de Libros" className="shadow-md rounded-md bg-white">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {librosFiltrados.map((libro) => (
              <div
                key={libro.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer bg-white"
                onClick={() => navigate(URLS.Libros.DETAIL(libro.id!))}
              >
                <h3 className="text-lg font-semibold mb-2">{libro.titulo}</h3>
                <p className="text-sm text-gray-700 mb-1">Autor: {libro.autor}</p>
                <p className="text-sm text-gray-600 mb-2">{libro.descripcion}</p>
                <p className="text-blue-600 font-semibold">Bs. {libro.precio}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default LibrosListPublic;
