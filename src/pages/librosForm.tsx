import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/constants";
import { useEffect, useState } from "react";
import { LibroService } from "../services/LibrosService";
import { GeneroService } from "../services/GeneroService";
import { Genero } from "../models/genero";

type Inputs = {
  titulo: string;
  autor: string;
  descripcion: string;
  precio: string;
  isbn: string;
  genero_ids: number[];
};

export const LibroForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [generos, setGeneros] = useState<Genero[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const libro: any = {
      id: id ? parseInt(id) : 0,
      ...data,
    };

    if (id) {
      new LibroService()
        .updateLibro(libro)
        .then(() => {
          alert("Libro actualizado exitosamente");
          navigate(URLS.Libros.LIST);
        })
        .catch((error) => {
          console.error("Error al actualizar el libro:", error);
          alert("Error al actualizar libro.");
        });
    } else {
      new LibroService()
        .insertLibro(libro)
        .then(() => {
          alert("Libro creado exitosamente");
          navigate(URLS.Libros.LIST);
        })
        .catch((error) => {
          console.error("Error al insertar el libro:", error);
          alert("Error al insertar libro.");
        });
    }
  };

  const loadLibro = async () => {
  new LibroService()
    .getLibro(parseInt(id!))
    .then((response) => {
      reset({
        titulo: response.titulo,
        autor: response.autor,
        descripcion: response.descripcion,
        precio: response.precio,
        isbn: response.isbn,
        genero_ids: response.generos ? response.generos.map((g: Genero) => g.id) : [],
      });
    });
};


  const loadGeneros = async () => {
    new GeneroService()
      .getAllGeneros()
      .then((response) => setGeneros(response));
  };

  useEffect(() => {
    loadGeneros();
    if (id) loadLibro();
  }, [id]);

  return (
    <div>
      <Card title="Formulario Libro" className="mx-5 my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <label htmlFor="titulo">Título:</label>
            <Input id="titulo" {...register("titulo", { required: true })} />
            {errors.titulo && <span className="text-red-500">Este campo es requerido</span>}
          </FormField>
          <FormField>
            <label htmlFor="autor">Autor:</label>
            <Input id="autor" {...register("autor", { required: true })} />
            {errors.autor && <span className="text-red-500">Este campo es requerido</span>}
          </FormField>
          <FormField>
            <label htmlFor="descripcion">Descripción:</label>
            <Input id="descripcion" {...register("descripcion", { required: true })} />
            {errors.descripcion && <span className="text-red-500">Este campo es requerido</span>}
          </FormField>
          <FormField>
            <label htmlFor="precio">Precio:</label>
            <Input
              id="precio"
              type="number"
              {...register("precio", {
                required: true,
                min: { value: 0, message: "El precio debe ser mayor o igual a 0" }
              })}
            />
            {errors.precio && <span className="text-red-500">{errors.precio.message || "Este campo es requerido"}</span>}
          </FormField>
          <FormField>
            <label htmlFor="isbn">ISBN:</label>
            <Input
              id="isbn"
              {...register("isbn", {
                required: true,
              })}
            />
            {errors.isbn && <span className="text-red-500">{errors.isbn.message}</span>}
          </FormField>
          <FormField>
            <label htmlFor="genero_ids">Géneros:</label>
            <select
              id="genero_ids"
              multiple
              {...register("genero_ids", { required: true })}
              className="w-full border rounded p-2"
            >
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nombre}
                </option>
              ))}
            </select>
            {errors.genero_ids && <span className="text-red-500">Seleccione al menos un género</span>}
          </FormField>

          <div className="flex gap-4 mt-4">
            <Button type="submit" title="Guardar" />
            <Button
              type="button"
              title="Cancelar"
              variant="danger"
              onClick={() => navigate(URLS.Libros.LIST)}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
