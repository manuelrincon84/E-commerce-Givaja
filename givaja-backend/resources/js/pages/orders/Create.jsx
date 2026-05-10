import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: "",
    order_date: "",
    total: "",
    status: "pending",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/orders");
  };

  const statuses = [
    { id: "pending", name: "Pendiente" },
    { id: "confirmed", name: "Confirmada" },
    { id: "shipped", name: "Enviada" },
    { id: "delivered", name: "Entregada" },
    { id: "cancelled", name: "Cancelada" },
  ];

  return (
    <MainLayout>
      <FormContainer
        title="Crear Orden"
        onSubmit={submit}
        submitText="Guardar"
        cancelHref="/orders"
        isLoading={processing}
      >
        <FormField
          label="Cliente"
          name="user_id"
          type="select"
          value={data.user_id}
          onChange={(e) => setData("user_id", e.target.value)}
          error={errors.user_id}
          options={users}
          required
        />

        <FormField
          label="Fecha de Orden"
          name="order_date"
          type="datetime-local"
          value={data.order_date}
          onChange={(e) => setData("order_date", e.target.value)}
          error={errors.order_date}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Total"
            name="total"
            type="number"
            value={data.total}
            onChange={(e) => setData("total", e.target.value)}
            error={errors.total}
            required
          />

          <FormField
            label="Estado"
            name="status"
            type="select"
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            error={errors.status}
            options={statuses}
            required
          />
        </div>
      </FormContainer>
    </MainLayout>
  );
}
