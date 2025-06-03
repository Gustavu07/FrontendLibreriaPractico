import { Libro } from "../models/libro";
import apiClient from "./interceptors";

export class LibroService {
  getAllLibros(): Promise<Array<Libro>> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("libros/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener los libros: " + error.message))
        );
    });
  }

  getLibro(id: number): Promise<Libro> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`libros/${id}/`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener el libro: " + error.message))
        );
    });
  }

  insertLibro(libro: Libro): Promise<Libro> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("libros/", libro)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden agregar libros.")
            );
          } else {
            reject(new Error("Error al insertar el libro: " + error.message));
          }
        });
    });
  }

  updateLibro(libro: Libro): Promise<Libro> {
    return new Promise((resolve, reject) => {
      if (!libro.id) {
        return reject(
          new Error("El libro debe tener un ID para actualizarse.")
        );
      }

      apiClient
        .put(`libros/${libro.id}/`, libro)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden modificar libros.")
            );
          } else {
            reject(new Error("Error al actualizar el libro: " + error.message));
          }
        });
    });
  }

  deleteLibro(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`libros/${id}/`)
        .then(() => resolve())
        .catch((error) => {
          if (error.response?.status === 403) {
            reject(
              new Error("Solo los administradores pueden eliminar libros.")
            );
          } else {
            reject(new Error("Error al eliminar el libro: " + error.message));
          }
        });
    });
  }
}
