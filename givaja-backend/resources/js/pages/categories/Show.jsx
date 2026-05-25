import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Show({ category }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  return (
    <MainLayout>
      <div className="card-section max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t("categories.category_details")}</h2>
          <Link
            href={localizedUrl("/categories")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("general.back", "Volver")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID:</label>
            <p className="text-gray-900">{category.id}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("categories.name")}:</label>
            <p className="text-gray-900">{category.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("categories.description")}:</label>
            <p className="text-gray-900">{category.description || "Sin descripción"}</p>
          </div>

          {category.created_at && (
            <div className="grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("categories.created")}:</label>
                <p className="text-gray-600 text-sm">
                  {new Date(category.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>
              {category.updated_at && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("categories.updated")}:</label>
                  <p className="text-gray-600 text-sm">
                    {new Date(category.updated_at).toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 border-t pt-6">
            <Link
              href={localizedUrl(`/categories/${category.id}/edit`)}
              className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
            >
              {t("general.edit")}
            </Link>
            <Link
              href={localizedUrl("/categories")}
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
