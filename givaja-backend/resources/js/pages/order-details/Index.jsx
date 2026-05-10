import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

export default function OrderDetailsIndex({ orderDetails, success }) {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const { delete: deleteDetail } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este detalle?")) {
      deleteDetail(`/order-details/${id}`, {
        onSuccess: () => setSelectedDetail(null),
      });
    }
  };

  const headers = ["ID", "Orden ID", "Producto", "Cantidad", "Precio Unit.", "Subtotal", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Detalles de Órdenes</h2>
          <Link
            href="/order-details/create"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Detalle
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={orderDetails.data || []}>
          {(detail) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{detail.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                #{detail.order_id}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{detail.product?.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{detail.quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                ${Number(detail.unit_price || 0).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                ${Number((detail.quantity * (detail.unit_price || 0))).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDetail(detail)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/order-details/${detail.id}/edit`}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(detail.id)}
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
        isOpen={selectedDetail !== null}
        onClose={() => setSelectedDetail(null)}
        title="Detalles del Detalle de Orden"
      >
        {selectedDetail && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">ID:</label>
                <p className="text-gray-900">{selectedDetail.id}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Orden ID:</label>
                <p className="text-gray-900">#{selectedDetail.order_id}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Producto:</label>
              <p className="text-gray-900">{selectedDetail.product?.name}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Cantidad:</label>
                <p className="text-gray-900">{selectedDetail.quantity}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Precio Unit.:</label>
                <p className="text-gray-900">
                  ${Number(selectedDetail.unit_price || 0).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Subtotal:</label>
                <p className="text-green-600 font-semibold">
                  ${Number((selectedDetail.quantity * (selectedDetail.unit_price || 0))).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
