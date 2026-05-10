import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Badge from "../../components/Badge";

export default function UsersIndex({ users, success }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const { delete: deleteUser } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      deleteUser(`/users/${id}`, {
        onSuccess: () => setSelectedUser(null),
      });
    }
  };

  const headers = ["ID", "Nombre", "Apellido", "Email", "Rol", "Acciones"];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Usuarios</h2>
          <Link
            href="/users/create"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Usuario
          </Link>
        </div>

        {success && <Alert message={success} type="success" />}

        <Table headers={headers} rows={users.data || []}>
          {(user) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {user.first_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.last_name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                <Badge type="primary">{user.role}</Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
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
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title="Detalles del Usuario"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedUser.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Nombre:</label>
                <p className="text-gray-900">{selectedUser.first_name}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Apellido:</label>
                <p className="text-gray-900">{selectedUser.last_name}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Email:</label>
              <p className="text-gray-900">{selectedUser.email}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Rol:</label>
              <p className="mt-2">
                <Badge type="primary">{selectedUser.role}</Badge>
              </p>
            </div>

            {selectedUser.created_at && (
              <div>
                <label className="font-semibold text-gray-700">Creado:</label>
                <p className="text-gray-600 text-sm">
                  {new Date(selectedUser.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
