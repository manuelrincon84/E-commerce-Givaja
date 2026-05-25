import MainLayout from "../../layouts/MainLayout";
import { useForm } from "@inertiajs/react";
import FormContainer from "../../components/FormContainer";
import FormField from "../../components/FormField";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Edit({ user }) {
  const localizedUrl = useLocalizedUrl();
    const t = useTranslate();
  const { data, setData, put, processing, errors } = useForm({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    role: user.role || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(localizedUrl(`/users/${user.id}`));
  };

  const roles = [
    { id: "admin", name: "Admin" },
    { id: "seller", name: "Vendedor" },
    { id: "customer", name: "Cliente" },
  ];

  return (
    <MainLayout>
      <FormContainer
        title={t("users.edit_title")}
        onSubmit={submit}
        submitText={t("general.update")}
        cancelHref={localizedUrl("/users")}
        isLoading={processing}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={t("users.first_name")}
            name="first_name"
            type="text"
            value={data.first_name}
            onChange={(e) => setData("first_name", e.target.value)}
            error={errors.first_name}
            required
          />

          <FormField
            label={t("users.last_name")}
            name="last_name"
            type="text"
            value={data.last_name}
            onChange={(e) => setData("last_name", e.target.value)}
            error={errors.last_name}
            required
          />
        </div>

        <FormField
          label={t("users.email")}
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          error={errors.email}
          required
        />

        <FormField
          label={t("users.role")}
          name="role"
          type="select"
          value={data.role}
          onChange={(e) => setData("role", e.target.value)}
          error={errors.role}
          options={roles}
          required
        />
      </FormContainer>
    </MainLayout>
  );
}
