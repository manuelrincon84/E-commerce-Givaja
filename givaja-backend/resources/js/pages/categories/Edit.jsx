import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Edit({ category }) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name || "",
    description: category.description || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/categories/${category.id}`);
  };

  return (
    <MainLayout>
      <FormContainer
        title="Editar Categoría"
        onSubmit={submit}
        submitText="Actualizar"
        cancelHref="/categories"
        isLoading={processing}
      >
        <FormField
          label="Nombre"
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          error={errors.name}
          required
        />

        <FormField
          label="Descripción"
          name="description"
          type="textarea"
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          error={errors.description}
          rows={4}
        />
      </FormContainer>
    </MainLayout>
  );
}
