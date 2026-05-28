import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

export default function CustomizationsIndex({ customizations, success }) {
  const [selectedCustomization, setSelectedCustomization] = useState(null);
  const { delete: deleteCustomization } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta personalización?")) {
      deleteCustomization(`/customizations/${id}`, {
        onSuccess: () => setSelectedCustomization(null),
      });
    }
  };

  const headers = ["ID", "Producto", "Color", "Material Extra", "Precio", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">Personalizaciones</h2>
          <Link
            href="/customizations/create"
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Personalización
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={customizations.data || []}>
          {(custom) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{custom.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                {custom.product?.name}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{custom.color || "-"}</td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{custom.extra_material || "-"}</td>
              <td style={{ color: 'var(--primary-500)' }} className="px-6 py-4 text-sm font-semibold">
                ${Number(custom.price || 0).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCustomization(custom)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/customizations/${custom.id}/edit`}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(custom.id)}
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

      <Modal
        isOpen={selectedCustomization !== null}
        onClose={() => setSelectedCustomization(null)}
        title="Detalles de la Personalización"
      >
        {selectedCustomization && (
          <div className="space-y-4">
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="font-semibold">ID:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">{selectedCustomization.id}</p>
            </div>

            <div>
              <label style={{ color: 'var(--text-dark)' }} className="font-semibold">Producto:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">{selectedCustomization.product?.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ color: 'var(--text-dark)' }} className="font-semibold">Color:</label>
                <p style={{ color: 'var(--text-dark)' }} className="">{selectedCustomization.color || "N/A"}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Material Extra:</label>
                <p className="text-gray-900">{selectedCustomization.extra_material || "N/A"}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Precio:</label>
              <p className="text-gray-900 font-semibold text-green-600">
                ${Number(selectedCustomization.price || 0).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
