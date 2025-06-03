import { Libro } from "./libro";

export interface DetalleCompra {
  id: number;
  compra: number;
  libro: Libro;
  precio_unitario: string;
}
