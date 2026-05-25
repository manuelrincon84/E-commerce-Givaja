import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Create() {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(localizedUrl("/categories"));
  };

  return (
    <MainLayout>
      <FormContainer
        title={t("categories.create_category", "Crear Categoría")}
        onSubmit={submit}
        submitText={t("general.save", "Guardar")}
        cancelHref={localizedUrl("/categories")}
        isLoading={processing}
      >
        <FormField
          label={t("general.name", "Nombre")}
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          error={errors.name}
          required
        />

        <FormField
          label={t("categories.description", "Descripción")}
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
