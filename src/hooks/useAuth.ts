import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, logoutUser } from "../redux/slices/authSlice";
import { AuthService } from "../services/AuthService";
type LoginParams = {
  access_token: string;
  refresh_token: string;
  email: string;
  isAdmin: boolean;
};
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);

  const doLogin = (params: LoginParams) => {
    dispatch(
      loginUser({
        email: params.email,
        isAdmin: params.isAdmin, // opcional, lo real se obtiene con .me()
      })
    );
  };

  const doLogout = () => {
    new AuthService()
      .logout()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  useEffect(() => {
    new AuthService().me().then((response) => {
      if (response.email) {
        dispatch(
          loginUser({
            email: response.email,
            isAdmin: response.is_staff, // importante aquí
          })
        );
      }
    });
  }, []);

  return { email, isAdmin, doLogin, doLogout };
};
