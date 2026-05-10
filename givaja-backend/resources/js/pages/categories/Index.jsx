import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

export default function CategoriesIndex({ categories, success }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { delete: deleteCategory } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      deleteCategory(`/categories/${id}`, {
        onSuccess: () => setSelectedCategory(null),
      });
    }
  };

  const headers = ["ID", "Nombre", "Descripción", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Categorías</h2>
          <Link
            href="/categories/create"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Categoría
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
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/categories/${category.id}/edit`}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </>
          )}
        </Table>
      </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        title="Detalles de la Categoría"
      >
        {selectedCategory && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedCategory.id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Nombre:</label>
              <p className="text-gray-900">{selectedCategory.name}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Descripción:</label>
              <p className="text-gray-900">{selectedCategory.description || "N/A"}</p>
            </div>

            {selectedCategory.created_at && (
              <div>
                <label className="font-semibold text-gray-700">Creada:</label>
                <p className="text-gray-600 text-sm">
                  {new Date(selectedCategory.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
