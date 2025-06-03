import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/constants";
import { useEffect } from "react";
import { Genero } from '../models/genero';
import { GeneroService } from "../services/GeneroService";

type Inputs = {
  nombre: string;
  descripcion: string;
};

export const GenerosForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const genero: Genero = {
      id: id ? parseInt(id) : 0,
      nombre: data.nombre,
      descripcion: data.descripcion,
    };

    if (id) {
      updateGenero(genero);
    } else {
      insertGenero(genero);
    }
  };

  const updateGenero = (genero: Genero) => {
    new GeneroService()
      .updateGenero(genero)
      .then(() => navigate(URLS.Generos.LIST))
      .catch((error) => {
        console.error("Error al actualizar el género: ", error);
        alert("Error al actualizar género, intente nuevamente");
      });
  };

  const insertGenero = (genero: Genero) => {
    new GeneroService()
      .insertGenero(genero)
      .then(() => navigate(URLS.Generos.LIST))
      .catch((error) => {
        console.error("Error al insertar el género: ", error);
        alert("Error al insertar género, intente nuevamente");
      });
  };

  const loadGenero = async () => {
    new GeneroService()
      .getGenero(parseInt(id!))
      .then((response) => {
        reset({
          nombre: response.nombre,
          descripcion: response.descripcion,
        });
      });
  };

  useEffect(() => {
    if (!id) return;
    loadGenero();
  }, [id]);

  return (
    <div>
      <Card title="Formulario Género" className="mx-5 my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <label htmlFor="nombre">Nombre:</label>
            <Input id="nombre" {...register("nombre", { required: true })} />
            {errors.nombre && <span>Este campo es requerido</span>}
          </FormField>
          <FormField>
            <label htmlFor="descripcion">Descripción:</label>
            <Input
              id="descripcion"
              {...register("descripcion", { required: true })}
            />
            {errors.descripcion && <span>Este campo es requerido</span>}
          </FormField>
          <Button type="submit" title="Guardar" />
        </form>
      </Card>
    </div>
  );
};
