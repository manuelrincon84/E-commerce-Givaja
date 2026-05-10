import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Edit({ cart, users }) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: cart.user_id || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/carts/${cart.id}`);
  };

  return (
    <MainLayout>
      <FormContainer
        title="Editar Carrito"
        onSubmit={submit}
        submitText="Actualizar"
        cancelHref="/carts"
        isLoading={processing}
      >
        <FormField
          label="Usuario"
          name="user_id"
          type="select"
          value={data.user_id}
          onChange={(e) => setData("user_id", e.target.value)}
          error={errors.user_id}
          options={users}
          required
        />
      </FormContainer>
    </MainLayout>
  );
}
