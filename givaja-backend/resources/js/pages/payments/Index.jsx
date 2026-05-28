import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Badge from "../../components/Badge";

export default function PaymentsIndex({ payments, success }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { delete: deletePayment } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pago?")) {
      deletePayment(`/payments/${id}`, {
        onSuccess: () => setSelectedPayment(null),
      });
    }
  };

  const headers = ["ID", "Orden ID", "Fecha de Pago", "Monto", "Estado", "Acciones"];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "primary",
      completed: "success",
      failed: "danger",
      refunded: "primary",
    };
    return statusMap[status] || "default";
  };

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">Pagos</h2>
          <Link
            href="/payments/create"
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Pago
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={payments.data || []}>
          {(payment) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{payment.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                #{payment.order_id}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {new Date(payment.payment_date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td style={{ color: 'var(--primary-500)' }} className="px-6 py-4 text-sm font-semibold">
                ${Number(payment.amount).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <Badge type={getStatusBadge(payment.payment_status)}>
                  {payment.payment_status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/payments/${payment.id}/edit`}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(payment.id)}
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
        isOpen={selectedPayment !== null}
        onClose={() => setSelectedPayment(null)}
        title="Detalles del Pago"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedPayment.id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Orden:</label>
              <p className="text-gray-900">#{selectedPayment.order_id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Fecha de Pago:</label>
              <p className="text-gray-900">
                {new Date(selectedPayment.payment_date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Monto:</label>
              <p className="text-gray-900 font-semibold text-green-600">
                ${Number(selectedPayment.amount).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Estado:</label>
              <p className="mt-2">
                <Badge type={getStatusBadge(selectedPayment.payment_status)}>
                  {selectedPayment.payment_status}
                </Badge>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
