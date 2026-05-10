import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Edit({ product, categories, users }) {
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
    put(`/products/${product.id}`);
  };

  return (
    <MainLayout>
      <FormContainer
        title="Editar Producto"
        onSubmit={submit}
        submitText="Actualizar"
        cancelHref="/products"
        isLoading={processing}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Categoría"
            name="category_id"
            type="select"
            value={data.category_id}
            onChange={(e) => setData("category_id", e.target.value)}
            error={errors.category_id}
            options={categories}
            required
          />

          <FormField
            label="Nombre"
            name="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={errors.name}
            required
          />
        </div>

        <FormField
          label="Descripción"
          name="description"
          type="textarea"
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          error={errors.description}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Precio"
            name="unit_price"
            type="number"
            value={data.unit_price}
            onChange={(e) => setData("unit_price", e.target.value)}
            error={errors.unit_price}
            required
          />

          <FormField
            label="Stock"
            name="stock"
            type="number"
            value={data.stock}
            onChange={(e) => setData("stock", e.target.value)}
            error={errors.stock}
            required
          />

          <FormField
            label="Usuario"
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
          label="URL Imagen"
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
