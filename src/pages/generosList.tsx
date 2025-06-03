import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { URLS } from "../navigation/constants";
import { Genero } from "../models/genero";
import { GeneroService } from "../services/GeneroService";

const GenerosList = () => {
  const navigate = useNavigate();
  const [generos, setGeneros] = useState<Array<Genero>>([]);

  const getGenerosList = () => {
    new GeneroService()
      .getAllGeneros()
      .then((response) => {
        setGeneros(response);
      })
      .catch((error) => {
        console.error("Error al obtener los géneros: ", error);
      });
  };

  useEffect(() => {
    getGenerosList();
  }, []);

  const deleteGenero = (id: string) => {
    const confirmation = window.confirm("¿Está seguro de que desea eliminar este género?");
    if (!confirmation) return;
    new GeneroService()
      .deleteGenero(Number(id))
      .then(() => {
        getGenerosList();
      })
      .catch((error) => {
        console.error("Error al eliminar el género: ", error);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <Card title="Lista de Géneros" className="shadow-md rounded-md bg-white">
          <div className="overflow-x-auto">
            <Table className="min-w-full leading-normal">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-4 px-8 text-left font-semibold border border-gray-300">ID</th>
                  <th className="py-4 px-8 text-left font-semibold border border-gray-300">Nombre</th>
                  <th className="py-4 px-6 text-center font-semibold border border-gray-300">Editar</th>
                  <th className="py-4 px-6 text-center font-semibold border border-gray-300">Eliminar</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {generos.map((genero) => (
                  <tr key={genero.id}>
                    <td className="py-5 px-8 leading-relaxed border border-gray-300">{genero.id}</td>
                    <td className="py-5 px-8 leading-relaxed border border-gray-300">{genero.nombre}</td>
                    <td className="py-4 px-6 text-center border border-gray-300">
                      <Button
                        onClick={() => navigate(URLS.Generos.UPDATE(genero.id.toString()))}
                        variant="primary"
                        title="Editar"
                      />
                    </td>
                    <td className="py-4 px-6 text-center border border-gray-300">
                      <Button
                        onClick={() => deleteGenero(genero.id.toString())}
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
            onClick={() => navigate(URLS.Generos.CREATE)}
            variant="primary"
            title="Crear Nuevo Género"
          />
        </div>
      </div>
    </>
  );
};

export default GenerosList;
