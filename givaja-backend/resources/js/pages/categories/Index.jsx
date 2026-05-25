import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function CategoriesIndex({ categories, success }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const [deleteId, setDeleteId] = useState(null);
  const { delete: deleteCategory } = useForm();

  const handleDelete = (id) => {
    if (window.confirm(t("categories.confirm_delete"))) {
      deleteCategory(localizedUrl(`/categories/${id}`), {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const headers = ["ID", t("general.name", "Nombre"), t("categories.description", "Descripción"), t("general.actions", "Acciones")];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t("categories.title")}</h2>
          <Link
            href={localizedUrl("/categories/create")}
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("categories.create_new")}
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={categories.data || []}>
          {(category) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{category.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {category.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {category.description?.substring(0, 50)}
                {category.description?.length > 50 ? "..." : ""}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={localizedUrl(`/categories/${category.id}`)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    {t("general.view", "Ver")}
                  </Link>
                  <Link
                    href={localizedUrl(`/categories/${category.id}/edit`)}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    {t("general.edit", "Editar")}
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-medium"
                  >
                    {t("general.delete", "Eliminar")}
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
