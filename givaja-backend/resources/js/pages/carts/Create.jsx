import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/carts");
  };

  return (
    <MainLayout>
      <FormContainer
        title="Crear Carrito"
        onSubmit={submit}
        submitText="Guardar"
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
