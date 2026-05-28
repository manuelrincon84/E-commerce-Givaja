import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

export default function CartItemsIndex({ cartItems, success }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const { delete: deleteItem } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      deleteItem(`/cart-items/${id}`, {
        onSuccess: () => setSelectedItem(null),
      });
    }
  };

  const headers = ["ID", "Carrito ID", "Producto", "Cantidad", "Precio Unit.", "Subtotal", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">Artículos del Carrito</h2>
          <Link
            href="/cart-items/create"
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            + Agregar Artículo
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={cartItems.data || []}>
          {(item) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{item.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                #{item.cart_id}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{item.product?.name}</td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">{item.quantity}</td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                ${Number(item.product?.unit_price || 0).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td style={{ color: 'var(--primary-500)' }} className="px-6 py-4 text-sm font-semibold">
                ${Number((item.quantity * (item.product?.unit_price || 0))).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/cart-items/${item.id}/edit`}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
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
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title="Detalles del Artículo"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
              <label style={{ color: 'var(--text-dark)' }} className="font-semibold">ID:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">{selectedItem.id}</p>
              </div>
              <div>
              <label style={{ color: 'var(--text-dark)' }} className="font-semibold">Carrito ID:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">#{selectedItem.cart_id}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Producto:</label>
              <p className="text-gray-900">{selectedItem.product?.name}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Cantidad:</label>
                <p className="text-gray-900">{selectedItem.quantity}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Precio Unit.:</label>
                <p className="text-gray-900">
                  ${Number(selectedItem.product?.unit_price || 0).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Subtotal:</label>
                <p className="text-green-600 font-semibold">
                  ${Number((selectedItem.quantity * (selectedItem.product?.unit_price || 0))).toLocaleString("es-ES", {
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
