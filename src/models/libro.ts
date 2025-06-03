import { Genero } from "./genero";

export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: string;
  isbn: string;
  genero_ids: number[];
  generos?: Genero[];
}
