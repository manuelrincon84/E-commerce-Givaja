import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Edit({ category }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const { data, setData, put, processing, errors } = useForm({
    name: category.name || "",
    description: category.description || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(localizedUrl(`/categories/${category.id}`));
  };

  return (
    <MainLayout>
      <FormContainer
        title={t("categories.edit_category", "Editar Categoría")}
        onSubmit={submit}
        submitText={t("general.update", "Actualizar")}
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
