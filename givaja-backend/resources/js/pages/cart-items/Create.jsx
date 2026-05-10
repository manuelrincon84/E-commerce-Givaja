import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create({ carts, products }) {
  const { data, setData, post, processing, errors } = useForm({
    cart_id: "",
    product_id: "",
    quantity: 1,
  });

  const submit = (e) => {
    e.preventDefault();
    post("/cart-items");
  };

  const cartOptions = carts.map(cart => ({
    id: cart.id,
    name: `Carrito #${cart.id} - ${cart.user?.first_name} ${cart.user?.last_name}`
  }));

  return (
    <MainLayout>
      <FormContainer
        title="Agregar Artículo al Carrito"
        onSubmit={submit}
        submitText="Guardar"
        cancelHref="/cart-items"
        isLoading={processing}
      >
        <FormField
          label="Carrito"
          name="cart_id"
          type="select"
          value={data.cart_id}
          onChange={(e) => setData("cart_id", e.target.value)}
          error={errors.cart_id}
          options={cartOptions}
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

        <FormField
          label="Cantidad"
          name="quantity"
          type="number"
          value={data.quantity}
          onChange={(e) => setData("quantity", e.target.value)}
          error={errors.quantity}
          required
        />
      </FormContainer>
    </MainLayout>
  );
}
