import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create({ orders }) {
  const { data, setData, post, processing, errors } = useForm({
    order_id: "",
    payment_date: "",
    amount: "",
    payment_status: "pending",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/payments");
  };

  const statuses = [
    { id: "pending", name: "Pendiente" },
    { id: "completed", name: "Completado" },
    { id: "failed", name: "Fallido" },
    { id: "refunded", name: "Reembolsado" },
  ];

  const orderOptions = orders.map(order => ({
    id: order.id,
    name: `Orden #${order.id} - $${Number(order.total).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }));

  return (
    <MainLayout>
      <FormContainer
        title="Crear Pago"
        onSubmit={submit}
        submitText="Guardar"
        cancelHref="/payments"
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
          label="Fecha de Pago"
          name="payment_date"
          type="datetime-local"
          value={data.payment_date}
          onChange={(e) => setData("payment_date", e.target.value)}
          error={errors.payment_date}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Monto"
            name="amount"
            type="number"
            value={data.amount}
            onChange={(e) => setData("amount", e.target.value)}
            error={errors.amount}
            required
          />

          <FormField
            label="Estado del Pago"
            name="payment_status"
            type="select"
            value={data.payment_status}
            onChange={(e) => setData("payment_status", e.target.value)}
            error={errors.payment_status}
            options={statuses}
            required
          />
        </div>
      </FormContainer>
    </MainLayout>
  );
}
