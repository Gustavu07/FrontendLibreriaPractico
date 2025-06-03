import { Routes, Route } from "react-router";
import { URLS } from "./constants";

import  GenerosList from "../pages/generosList";
import { GenerosForm  } from "../pages/generosForm";
import { LibroForm } from "../pages/librosForm";
import { LoginForm } from "../pages/LoginForm";
import { RegisterForm } from "../pages/RegisterForm";
import LibrosListPublic from "../pages/LibrosPublicList";
import LibrosListAdmin from "../pages/LibrosListAdmin";
import LibroDetail from "../pages/LibroDetail";
import CarritoPage from "../pages/CarritoPage";
import PagoPage from "../pages/PagoPage";


const RouterConfig = () => {
  return (
    <Routes>
      {/* Ruta pública para la lista de libros - ruta raíz */}
      <Route path={URLS.Libros.PUBLIC_LIST} element={<LibrosListPublic />} />
      <Route path={URLS.Libros.DETAIL(":id")} element={<LibroDetail />} />

      <Route path={URLS.CARRITO} element={<CarritoPage />} />
      <Route path={URLS.COMPRA.PAGO} element={<PagoPage />} />

      <Route path={URLS.Generos.LIST} element={<GenerosList />} />
      <Route path={URLS.Generos.CREATE} element={<GenerosForm />} />
      <Route path={URLS.Generos.EDIT} element={<GenerosForm />} />

      {/* Rutas para libros administración */}
      <Route path={URLS.Libros.LIST} element={<LibrosListAdmin />} />
      <Route path={URLS.Libros.CREATE} element={<LibroForm />} />
      <Route path={URLS.Libros.EDIT} element={<LibroForm />} />

      <Route path={URLS.LOGIN} element={<LoginForm />} />
      <Route path={URLS.REGISTER} element={<RegisterForm />} />
    </Routes>
  );
};

export default RouterConfig;
