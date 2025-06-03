export const URLS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CARRITO: "/carrito",
  Generos: {
    LIST: "/generos",
    CREATE: "/generos/create",
    EDIT: "/generos/:id",
    UPDATE: (id: string) => `/generos/${id}`,
  },
  Libros: {
    PUBLIC_LIST: "/",
    DETAIL: (id: number | string) => `/libros/${id}`,
    LIST: "/libros",
    CREATE: "/libros/create",
    EDIT: "/libros/:id/edit",
    UPDATE: (id: string) => `/libros/${id}`,
  },
  COMPRA: {
    PAGO: "/pago/:compraId",
  },
};
