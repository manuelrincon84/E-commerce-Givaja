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
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">{t("categories.title")}</h2>
          <Link
            href={localizedUrl("/categories/create")}
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("categories.create_new")}
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={categories.data || []}>
          {(category) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{category.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                {category.name}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {category.description?.substring(0, 50)}
                {category.description?.length > 50 ? "..." : ""}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={localizedUrl(`/categories/${category.id}`)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    {t("general.view", "Ver")}
                  </Link>
                  <Link
                    href={localizedUrl(`/categories/${category.id}/edit`)}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
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
