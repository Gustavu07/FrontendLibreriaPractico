import apiClient from "./interceptors";
import { DetalleCompra } from "../models/DetalleCompra";

export class DetalleCompraService {
  obtenerDetallesPorCompra(compraId: number): Promise<DetalleCompra[]> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`detalle-compra/?compra_id=${compraId}`)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(
            new Error(
              "Error al obtener los detalles de la compra: " + error.message
            )
          )
        );
    });
  }
}
