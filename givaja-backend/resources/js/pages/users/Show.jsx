import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";
import Badge from "../../components/Badge";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Show({ user }) {
  const localizedUrl = useLocalizedUrl();
    const t = useTranslate();
  return (
    <MainLayout>
      <div className="card-section max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Detalles del Usuario</h2>
          <Link
            href={localizedUrl("/users")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("general.back")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID:</label>
            <p className="text-gray-900">{user.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.first_name")}:</label>
              <p className="text-gray-900">{user.first_name}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.last_name")}:</label>
              <p className="text-gray-900">{user.last_name}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.email")}:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.role")}:</label>
            <p className="mt-2">
              <Badge type="primary">{user.role}</Badge>
            </p>
          </div>

          {user.created_at && (
            <div className="grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.created")}:</label>
                <p className="text-gray-600 text-sm">
                  {new Date(user.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>
              {user.updated_at && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("users.updated")}:</label>
                  <p className="text-gray-600 text-sm">
                    {new Date(user.updated_at).toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 border-t pt-6">
            <Link
              href={localizedUrl(`/users/${user.id}/edit`)}
              className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
            >
              {t("general.edit")}
            </Link>
            <Link
              href={localizedUrl("/users")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
            >
              {t("general.back")}
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
