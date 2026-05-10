import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Badge from "../../components/Badge";

export default function OrdersIndex({ orders, success }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { delete: deleteOrder } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta orden?")) {
      deleteOrder(`/orders/${id}`, {
        onSuccess: () => setSelectedOrder(null),
      });
    }
  };

  const headers = ["ID", "Cliente", "Fecha", "Total", "Estado", "Acciones"];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "primary",
      confirmed: "success",
      shipped: "primary",
      delivered: "success",
      cancelled: "danger",
    };
    return statusMap[status] || "default";
  };

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Órdenes</h2>
          <Link
            href="/orders/create"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Orden
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={orders.data || []}>
          {(order) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {order.user?.first_name} {order.user?.last_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(order.order_date).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                ${Number(order.total).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <Badge type={getStatusBadge(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/orders/${order.id}/edit`}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(order.id)}
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
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title="Detalles de la Orden"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedOrder.id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Cliente:</label>
              <p className="text-gray-900">
                {selectedOrder.user?.first_name} {selectedOrder.user?.last_name}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Fecha:</label>
              <p className="text-gray-900">
                {new Date(selectedOrder.order_date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Total:</label>
              <p className="text-gray-900 font-semibold text-green-600">
                ${Number(selectedOrder.total).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Estado:</label>
              <p className="mt-2">
                <Badge type={getStatusBadge(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
