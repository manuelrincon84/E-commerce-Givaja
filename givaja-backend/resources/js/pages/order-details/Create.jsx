import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create({ orders, products }) {
  const { data, setData, post, processing, errors } = useForm({
    order_id: "",
    product_id: "",
    quantity: 1,
    unit_price: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/order-details");
  };

  const orderOptions = orders.map(order => ({
    id: order.id,
    name: `Orden #${order.id}`
  }));

  return (
    <MainLayout>
      <FormContainer
        title="Crear Detalle de Orden"
        onSubmit={submit}
        submitText="Guardar"
        cancelHref="/order-details"
        isLoading={processing}
      >
        <FormField
          label="Orden"
          name="order_id"
          type="select"
          value={data.order_id}
          onChange={(e) => setData("order_id", e.target.value)}
          error={errors.order_id}
          options={orderOptions}
          required
        />

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
            label="Cantidad"
            name="quantity"
            type="number"
            value={data.quantity}
            onChange={(e) => setData("quantity", e.target.value)}
            error={errors.quantity}
            required
          />

          <FormField
            label="Precio Unitario"
            name="unit_price"
            type="number"
            value={data.unit_price}
            onChange={(e) => setData("unit_price", e.target.value)}
            error={errors.unit_price}
            required
          />
        </div>
      </FormContainer>
    </MainLayout>
  );
}
