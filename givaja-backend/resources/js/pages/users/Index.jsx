import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import Badge from "../../components/Badge";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function UsersIndex({ users, success }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const [deleteId, setDeleteId] = useState(null);
  const { delete: deleteUser } = useForm();

  const handleDelete = (id) => {
    if (window.confirm(t("users.confirm_delete"))) {
      deleteUser(localizedUrl(`/users/${id}`), {
        onSuccess: () => setSelectedUser(null),
      });
    }
  };

  const headers = ["ID", t("general.name"), t("users.last_name"), t("users.email"), t("users.role"), t("general.actions")];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t("users.title")}</h2>
          <Link
            href={localizedUrl("/users/create")}
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
           {t("users.create_new")}
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={users.data || []}>
          {(user) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {user.first_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.last_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                <Badge type="primary">{user.role}</Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={localizedUrl(`/users/${user.id}`)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    {t("general.view")}
                  </Link>
                  <Link
                    href={localizedUrl(`/users/${user.id}/edit`)}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    {t("general.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-medium"
                  >
                    {t("general.delete")}
                  </button>
                </div>
              </td>
            </>
          )}
        </Table>
      </div>
    </MainLayout>
  );
}
