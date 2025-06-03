import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../components/Input"
import { FormField } from "../components/FormField"
import { Card } from '../components/Card';
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import { GuestMenu } from "../components/GuestMenu";

type Inputs = {
    email: string
    password: string
}

export const LoginForm = () => {
    const navigate = useNavigate()
    const { doLogin } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const login: LoginRequest = {
            username: data.email,
            password: data.password,
        }

        new AuthService()
            .login(login.username, login.password)
            .then((response) => {
                // Luego del login, obtener los datos reales del usuario
                new AuthService().me().then((user) => {
                    doLogin({
                        access_token: response.access,
                        refresh_token: response.refresh,
                        email: user.email,
                        isAdmin: user.is_staff
                    })
                    
                    if (user.is_staff) {
                        navigate(URLS.Libros.LIST) // Admin
                    } else {
                        navigate("/")
                    }
                })
            })
            .catch((error) => {
                console.error("Error en login:", error)
            })
    }

    return (
        <>
            <GuestMenu />
            <Container>
                <Card title="Iniciar sesión" className="mx-5 my-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormField>
                            <label htmlFor="email">Email:</label>
                            <Input type="text" id="email" {...register("email", { required: true })} />
                            {errors.email && <span>Este campo es requerido</span>}
                        </FormField>
                        <FormField>
                            <label htmlFor="password">Contraseña:</label>
                            <Input type="password" id="password" {...register("password", { required: true })} />
                            {errors.password && <span>Este campo es requerido</span>}
                        </FormField>
                        <Button type="submit" title="Guardar" />
                    </form>
                </Card>
            </Container>
        </>
    )
}
