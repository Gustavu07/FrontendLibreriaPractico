// src/services/compraService.ts
import apiClient from "./interceptors";
import { Compra } from "../models/Compra";

export class CompraService {
  comprar(): Promise<{ mensaje: string; compra_id: number; total: number }> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("compras/comprar/")
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(new Error("Error al realizar la compra: " + error.message))
        );
    });
  }

  obtenerDetalleCompra(id: number): Promise<Compra> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`compras/${id}/`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(
            new Error(
              "Error al obtener el detalle de la compra: " + error.message
            )
          )
        );
    });
  }
}
