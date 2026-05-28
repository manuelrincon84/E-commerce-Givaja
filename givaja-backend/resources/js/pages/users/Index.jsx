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
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">{t("users.title")}</h2>
          <Link
            href={localizedUrl("/users/create")}
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
           {t("users.create_new")}
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={users.data || []}>
          {(user) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{user.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                {user.first_name}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{user.last_name}</td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                <Badge type="primary">{user.role}</Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={localizedUrl(`/users/${user.id}`)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    {t("general.view")}
                  </Link>
                  <Link
                    href={localizedUrl(`/users/${user.id}/edit`)}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-90 transition text-xs font-medium"
                  >
                    {t("general.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ backgroundColor: 'var(--error-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-90 transition text-xs font-medium"
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
