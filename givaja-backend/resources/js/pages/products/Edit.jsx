import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Edit({ product, categories, users }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const { data, setData, put, processing, errors } = useForm({
    category_id: product.category_id || "",
    name: product.name || "",
    description: product.description || "",
    unit_price: product.unit_price || "",
    stock: product.stock || 0,
    updated_by: product.updated_by || "",
    image_url: product.image_url || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(localizedUrl(`/products/${product.id}`));
  };

  return (
    <MainLayout>
      <FormContainer
        title={t("products.edit_product", "Editar Producto")}
        onSubmit={submit}
        submitText={t("general.update", "Actualizar")}
        cancelHref={localizedUrl("/products")}
        isLoading={processing}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={t("products.category", "Categoría")}
            name="category_id"
            type="select"
            value={data.category_id}
            onChange={(e) => setData("category_id", e.target.value)}
            error={errors.category_id}
            options={categories}
            required
          />

          <FormField
            label={t("general.name", "Nombre")}
            name="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={errors.name}
            required
          />
        </div>

        <FormField
          label={t("products.description", "Descripción")}
          name="description"
          type="textarea"
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          error={errors.description}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            label={t("products.price", "Precio")}
            name="unit_price"
            type="number"
            value={data.unit_price}
            onChange={(e) => setData("unit_price", e.target.value)}
            error={errors.unit_price}
            required
          />

          <FormField
            label={t("products.stock", "Stock")}
            name="stock"
            type="number"
            value={data.stock}
            onChange={(e) => setData("stock", e.target.value)}
            error={errors.stock}
            required
          />

          <FormField
            label={t("products.user", "Usuario")}
            name="updated_by"
            type="select"
            value={data.updated_by}
            onChange={(e) => setData("updated_by", e.target.value)}
            error={errors.updated_by}
            options={users}
            required
          />
        </div>

        <FormField
          label={t("products.image_url", "URL Imagen")}
          name="image_url"
          type="url"
          value={data.image_url}
          onChange={(e) => setData("image_url", e.target.value)}
          error={errors.image_url}
        />
      </FormContainer>
    </MainLayout>
  );
}
