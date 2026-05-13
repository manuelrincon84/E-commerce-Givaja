import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import SearchBox from "../../components/SearchBox";

export default function ProductsIndex({ products, flash, search = "" }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { delete: deleteProduct } = useForm();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      deleteProduct(`/products/${id}`, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const headers = [
    "ID",
    "Nombre",
    "Descripción",
    "Precio",
    "Stock",
    "Imagen",
    "Categoría",
    "Usuario",
    "Acciones",
  ];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Productos</h2>
          <Link
            href="/products/create"
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
          >
            + Crear Producto
          </Link>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <SearchBox
            placeholder="Buscar por nombre, descripción, precio o categoría..."
            route="/products"
            queryParam="search"
            initialValue={search}
            debounceDelay={500}
          />
        </div>

        {flash?.success && <Alert message={flash.success} type="success" />}

        {/* Mostrar mensaje si no hay resultados */}
        {products.data && products.data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {search
                ? `No se encontraron productos para "${search}"`
                : "No hay productos disponibles"}
            </p>
          </div>
        ) : (
          <Table headers={headers} rows={products.data || []}>
          {(product) => (
            <>
              <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {product.description?.substring(0, 30)}
                {product.description?.length > 30 ? "..." : ""}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                ${Number(product.unit_price).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0
                      ? "badge-success"
                      : "badge-danger"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {product.category?.name || "Sin categoría"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {product.updated_by_user?.first_name || "Sin usuario"}{" "}
                {product.updated_by_user?.last_name || ""}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="border-2 border-green-400 text-green-400 px-3 py-1 rounded hover:bg-green-50 transition text-xs font-medium"
                  >
                    Ver
                  </button>
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition text-xs font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </>
          )}
        </Table>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {products.links.map((link, index) => (
            <a
            key={index}
            href={link.url || '#'}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`
                px-4 py-2 rounded border
                ${link.active
                ? 'bg-green-400 text-white'
                : 'bg-white text-gray-700'}
                ${!link.url && 'opacity-50 pointer-events-none'}
            `}/>
       ))}
    </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title="Detalles del Producto"
      >
        {selectedProduct && (
          <div className="space-y-4">
            {selectedProduct.image_url && (
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div>
              <label className="font-semibold text-gray-700">ID:</label>
              <p className="text-gray-900">{selectedProduct.id}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Nombre:</label>
              <p className="text-gray-900">{selectedProduct.name}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Descripción:</label>
              <p className="text-gray-900">{selectedProduct.description || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Precio:</label>
                <p className="text-gray-900 font-semibold text-green-600">
                  ${Number(selectedProduct.unit_price).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Stock:</label>
                <p className={`font-semibold ${selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {selectedProduct.stock}
                </p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Categoría:</label>
              <p className="text-gray-900">{selectedProduct.category?.name || "Sin categoría"}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Actualizado por:</label>
              <p className="text-gray-900">
                {selectedProduct.updated_by_user?.first_name || "Sin usuario"}{" "}
                {selectedProduct.updated_by_user?.last_name || ""}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
