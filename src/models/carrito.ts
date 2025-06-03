export interface Carrito {
  id: number;
  usuario?: number;
  libro: number; // <- cambiar de Libro a number
  libro_titulo: string; // <- agregar esto
  fecha_agregado: string;
}
