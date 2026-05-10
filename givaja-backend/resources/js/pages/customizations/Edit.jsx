import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Edit({ customization, products }) {
  const { data, setData, put, processing, errors } = useForm({
    product_id: customization.product_id || "",
    color: customization.color || "",
    extra_material: customization.extra_material || "",
    price: customization.price || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/customizations/${customization.id}`);
  };

  return (
    <MainLayout>
      <FormContainer
        title="Editar Personalización"
        onSubmit={submit}
        submitText="Actualizar"
        cancelHref="/customizations"
        isLoading={processing}
      >
        <FormField
          label="Producto"
          name="product_id"
          type="select"
          value={data.product_id}
          onChange={(e) => setData("product_id", e.target.value)}
          error={errors.product_id}
          options={products}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Color"
            name="color"
            type="text"
            value={data.color}
            onChange={(e) => setData("color", e.target.value)}
            error={errors.color}
          />

          <FormField
            label="Material Extra"
            name="extra_material"
            type="text"
            value={data.extra_material}
            onChange={(e) => setData("extra_material", e.target.value)}
            error={errors.extra_material}
          />
        </div>

        <FormField
          label="Precio"
          name="price"
          type="number"
          value={data.price}
          onChange={(e) => setData("price", e.target.value)}
          error={errors.price}
          required
        />
      </FormContainer>
    </MainLayout>
  );
}
