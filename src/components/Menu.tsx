import { useState } from "react";
import { Link } from "react-router";
import { URLS } from "../navigation/constants";
import { ChevronDown } from "react-bootstrap-icons";
import { useAuth } from "../hooks/useAuth";

export const Menu = () => {
  const [showSubMenuId, setShowSubMenuId] = useState<string | null>(null);
  const { email, isAdmin, doLogout } = useAuth();

  const toggleSubMenu = (id: string) => {
    setShowSubMenuId((prevId) => (prevId === id ? null : id));
  };

  const onLogoutClick = () => {
    doLogout();
    window.location.href = URLS.LOGIN;
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">MiLibrería</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to={URLS.HOME} className="text-white hover:text-blue-600">
              Inicio
            </Link>

            {/* Sección de administrador */}
            {isAdmin && (
              <>
                {/* Géneros */}
                <div className="relative group">
                  <button
                    onClick={() => toggleSubMenu("generos")}
                    className="cursor-pointer text-white hover:text-blue-600"
                  >
                    Géneros <ChevronDown size={10} className="inline" />
                  </button>
                  {showSubMenuId === "generos" && (
                    <div className="absolute bg-white shadow-md mt-2 rounded-md z-10">
                      <Link
                        to={URLS.Generos.LIST}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Lista de géneros
                      </Link>
                      <Link
                        to={URLS.Generos.CREATE}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Crear género
                      </Link>
                    </div>
                  )}
                </div>

                {/* Libros */}
                <div className="relative group">
                  <button
                    onClick={() => toggleSubMenu("libros")}
                    className="cursor-pointer text-white hover:text-blue-600"
                  >
                    Libros <ChevronDown size={10} className="inline" />
                  </button>
                  {showSubMenuId === "libros" && (
                    <div className="absolute bg-white shadow-md mt-2 rounded-md z-10">
                      <Link
                        to={URLS.Libros.LIST}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Lista de libros
                      </Link>
                      <Link
                        to={URLS.Libros.CREATE}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Crear libro
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Usuario logueado (no admin) */}
            {!isAdmin && email && (
              <>
                <Link
                  to={URLS.CARRITO}
                  className="text-white hover:text-blue-600"
                >
                  Carrito
                </Link>
                <Link
                  to="/mis-compras"
                  className="text-white hover:text-blue-600"
                >
                  Mis Compras
                </Link>
              </>
            )}

            {/* Autenticación */}
            {!email ? (
              <>
                <Link to={URLS.LOGIN} className="text-white hover:text-blue-600">
                  Iniciar sesión
                </Link>
                <Link
                  to={URLS.REGISTER}
                  className="text-white hover:text-blue-600"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => toggleSubMenu("authMenu")}
                  className="cursor-pointer text-white hover:text-blue-600"
                >
                  {email} <ChevronDown size={10} className="inline" />
                </button>
                {showSubMenuId === "authMenu" && (
                  <div className="absolute bg-white shadow-md mt-2 rounded-md z-10">
                    <button
                      onClick={onLogoutClick}
                      className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-100 text-start"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
