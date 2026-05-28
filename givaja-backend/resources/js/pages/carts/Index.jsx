import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

export default function CartsIndex({ carts, success }) {
  const [selectedCart, setSelectedCart] = useState(null);
  const { delete: deleteCart } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este carrito?")) {
      deleteCart(`/carts/${id}`, {
        onSuccess: () => setSelectedCart(null),
      });
    }
  };

  const headers = ["ID", "Usuario", "Items", "Creado", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">Carritos</h2>
          <Link
            href="/carts/create"
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Carrito
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={carts.data || []}>
          {(cart) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{cart.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                {cart.user?.first_name} {cart.user?.last_name}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {cart.cart_items?.length || 0}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {new Date(cart.created_at).toLocaleDateString('es-ES')}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCart(cart)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/carts/${cart.id}/edit`}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(cart.id)}
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
        isOpen={selectedCart !== null}
        onClose={() => setSelectedCart(null)}
        title="Detalles del Carrito"
      >
        {selectedCart && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedCart.id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Usuario:</label>
              <p className="text-gray-900">
                {selectedCart.user?.first_name} {selectedCart.user?.last_name}
              </p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Items:</label>
              <p className="text-gray-900">{selectedCart.cart_items?.length || 0}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Creado:</label>
              <p className="text-gray-600 text-sm">
                {new Date(selectedCart.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
