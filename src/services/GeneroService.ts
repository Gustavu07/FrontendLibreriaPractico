import { Genero } from "../models/genero";
import apiClient from "./interceptors";

export class GeneroService {
  getAllGeneros(): Promise<Array<Genero>> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("generos/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener los géneros: " + error.message))
        );
    });
  }

  getGenero(id: number): Promise<Genero> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`generos/${id}/`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener el género: " + error.message))
        );
    });
  }

  insertGenero(genero: Genero): Promise<Genero> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("generos/", genero)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden agregar géneros.")
            );
          } else {
            reject(new Error("Error al insertar el género: " + error.message));
          }
        });
    });
  }

  updateGenero(genero: Genero): Promise<Genero> {
    return new Promise((resolve, reject) => {
      apiClient
        .put(`generos/${genero.id}/`, genero)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden modificar géneros.")
            );
          } else {
            reject(
              new Error("Error al actualizar el género: " + error.message)
            );
          }
        });
    });
  }

  deleteGenero(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`generos/${id}/`)
        .then(() => resolve())
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden eliminar géneros.")
            );
          } else {
            reject(new Error("Error al eliminar el género: " + error.message));
          }
        });
    });
  }
}
