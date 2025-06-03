import { Carrito } from "../models/carrito";
import apiClient from "./interceptors";

export class CarritoService {
  getCarrito(): Promise<Array<Carrito>> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("carrito/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al obtener el carrito: " + error.message))
        );
    });
  }

  agregarLibroAlCarrito(libroId: number): Promise<Carrito> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("carrito/", { libro: libroId })
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.status === 400) {
            reject(new Error("El libro ya está en el carrito."));
          } else {
            reject(
              new Error(
                "Error al agregar el libro al carrito: " + error.message
              )
            );
          }
        });
    });
  }

  eliminarDelCarrito(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`carrito/${id}/`)
        .then(() => resolve())
        .catch((error) =>
          reject(
            new Error(
              "Error al eliminar el libro del carrito: " + error.message
            )
          )
        );
    });
  }
}
