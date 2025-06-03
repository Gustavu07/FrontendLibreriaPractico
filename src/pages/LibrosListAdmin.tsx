import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { URLS } from "../navigation/constants";
import { Menu } from "../components/Menu";
import { Libro } from "../models/libro";
import { LibroService } from "../services/LibrosService";

const LibrosListAdmin = () => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState<Libro[]>([]);

  const getLibrosList = () => {
    new LibroService()
      .getAllLibros()
      .then((response) => setLibros(response))
      .catch((error) => console.error("Error al obtener los libros: ", error));
  };

  const deleteLibro = (id: number) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este libro?");
    if (!confirmacion) return;

    new LibroService()
      .deleteLibro(id)
      .then(() => getLibrosList())
      .catch((error) => console.error("Error al eliminar el libro: ", error));
  };

  useEffect(() => {
    getLibrosList();
  }, []);

  return (
    <>
      <Menu />
    <div className="container mx-auto p-4">
      <Card title="Gestión de Libros" className="shadow-md rounded-md bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-full leading-normal">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-4 px-8 border border-gray-300 text-left">ID</th>
                <th className="py-4 px-8 border border-gray-300 text-left">Título</th>
                <th className="py-4 px-8 border border-gray-300 text-left">Autor</th>
                <th className="py-4 px-8 border border-gray-300 text-left">Precio</th>
                <th className="py-4 px-6 border border-gray-300 text-center">Editar</th>
                <th className="py-4 px-6 border border-gray-300 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {libros.map((libro) => (
                <tr key={libro.id}>
                  <td className="py-4 px-8 border border-gray-300">{libro.id}</td>
                  <td className="py-4 px-8 border border-gray-300">{libro.titulo}</td>
                  <td className="py-4 px-8 border border-gray-300">{libro.autor}</td>
                  <td className="py-4 px-8 border border-gray-300">Bs. {libro.precio}</td>
                  <td className="py-4 px-6 text-center border border-gray-300">
                    <Button
                      onClick={() => navigate(URLS.Libros.UPDATE(libro.id?.toString() || ""))}
                      variant="primary"
                      title="Editar"
                    />
                  </td>
                  <td className="py-4 px-6 text-center border border-gray-300">
                    <Button
                      onClick={() => deleteLibro(libro.id!)}
                      variant="danger"
                      title="Eliminar"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      <div className="mt-4">
        <Button
          onClick={() => navigate(URLS.Libros.CREATE)}
          variant="primary"
          title="Crear Nuevo Libro"
        />
      </div>
    </div>
    </>
  );
};

export default LibrosListAdmin;
