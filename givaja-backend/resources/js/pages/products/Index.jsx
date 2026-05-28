import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import SearchBox from "../../components/SearchBox";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function ProductsIndex({ products, flash, search = "" }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  const [deleteId, setDeleteId] = useState(null);
  const { delete: deleteProduct } = useForm();

  const handleDelete = (id) => {
    if (window.confirm(t("products.confirm_delete"))) {
      deleteProduct(localizedUrl(`/products/${id}`), {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const headers = [
    "ID",
    t("general.name", "Nombre"),
    t("products.description", "Descripción"),
    t("products.price", "Precio"),
    t("products.stock", "Stock"),
    t("general.image", "Imagen"),
    t("products.category", "Categoría"),
    t("products.user", "Usuario"),
    t("general.actions", "Acciones"),
  ];

  return (
    <MainLayout>
      <div className="card-section">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">{t("products.title")}</h2>
          <Link
            href={localizedUrl("/products/create")}
            style={{ backgroundColor: 'var(--primary-500)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("products.create_new")}
          </Link>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <SearchBox
            placeholder={t("products.search_placeholder")}
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
            <p style={{ color: 'var(--gray-600)' }} className="">
              {search
                ? `${t("products.no_products")} "${search}"`
                : t("products.no_products")}
            </p>
          </div>
        ) : (
          <Table headers={headers} rows={products.data || []}>
          {(product) => (
            <>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm">{product.id}</td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
                {product.name}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {product.description?.substring(0, 30)}
                {product.description?.length > 30 ? "..." : ""}
              </td>
              <td style={{ color: 'var(--text-dark)' }} className="px-6 py-4 text-sm font-semibold">
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
                  <span style={{ color: 'var(--gray-500)' }} className="">-</span>
                )}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {product.category?.name || "Sin categoría"}
              </td>
              <td style={{ color: 'var(--gray-600)' }} className="px-6 py-4 text-sm">
                {product.updated_by_user?.first_name || "Sin usuario"}{" "}
                {product.updated_by_user?.last_name || ""}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={localizedUrl(`/products/${product.id}`)}
                    style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
                    className="border-2 px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    {t("general.view", "Ver")}
                  </Link>
                  <Link
                    href={localizedUrl(`/products/${product.id}/edit`)}
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    className="text-white px-3 py-1 rounded hover:opacity-80 transition text-xs font-medium"
                  >
                    {t("general.edit", "Editar")}
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs font-medium"
                  >
                    {t("general.delete", "Eliminar")}
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
                ? 'text-white'
                : 'text-gray-700 hover:bg-gray-100'}
                ${!link.url && 'opacity-50 pointer-events-none'}
            `}
            style={{
                backgroundColor: link.active ? 'var(--primary-500)' : 'white',
                borderColor: link.active ? 'var(--primary-500)' : 'var(--gray-300)'
            }}
            />
       ))}
    </div>

    </MainLayout>
  );
}
