import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/users");
  };

  const roles = [
    { id: "admin", name: "Admin" },
    { id: "seller", name: "Vendedor" },
    { id: "customer", name: "Cliente" },
  ];

  return (
    <MainLayout>
      <FormContainer
        title="Crear Usuario"
        onSubmit={submit}
        submitText="Guardar"
        cancelHref="/users"
        isLoading={processing}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Nombre"
            name="first_name"
            type="text"
            value={data.first_name}
            onChange={(e) => setData("first_name", e.target.value)}
            error={errors.first_name}
            required
          />

          <FormField
            label="Apellido"
            name="last_name"
            type="text"
            value={data.last_name}
            onChange={(e) => setData("last_name", e.target.value)}
            error={errors.last_name}
            required
          />
        </div>

        <FormField
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          error={errors.email}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            error={errors.password}
            required
          />

          <FormField
            label="Rol"
            name="role"
            type="select"
            value={data.role}
            onChange={(e) => setData("role", e.target.value)}
            error={errors.role}
            options={roles}
            required
          />
        </div>
      </FormContainer>
    </MainLayout>
  );
}
