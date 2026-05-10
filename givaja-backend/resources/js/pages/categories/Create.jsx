import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/categories");
  };

  return (
    <MainLayout>
      <FormContainer
        title="Crear Categoría"
        onSubmit={submit}
        submitText="Guardar"
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
