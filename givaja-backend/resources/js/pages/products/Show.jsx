import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";
import useLocalizedUrl from "../../hooks/useLocalizedUrl";
import useTranslate from "../../hooks/useTranslate";

export default function Show({ product }) {
  const localizedUrl = useLocalizedUrl();
  const t = useTranslate();
  return (
    <MainLayout>
      <div className="card-section max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'var(--text-dark)' }} className="text-3xl font-bold">{t("products.product_details")}</h2>
          <Link
            href={localizedUrl("/products")}
            style={{ backgroundColor: 'var(--gray-600)' }}
            className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("general.back", "Volver")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">ID:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">{product.id}</p>
            </div>
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.category")}:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">{product.category?.name || t("general.no_category", "Sin categoría")}</p>
            </div>
          </div>

          <div>
            <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("general.name", "Nombre")}:</label>
            <p style={{ color: 'var(--text-dark)' }} className="">{product.name}</p>
          </div>

          <div>
            <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.description", "Descripción")}:</label>
            <p style={{ color: 'var(--text-dark)' }} className="">{product.description || t("general.no_description", "Sin descripción")}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.price", "Precio")}:</label>
              <p style={{ color: 'var(--text-dark)' }} className="font-semibold">
                ${Number(product.unit_price).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.stock", "Stock")}:</label>
              <p style={{ color: product.stock > 0 ? 'var(--primary-500)' : 'var(--error-500)' }} className="font-semibold">
                {product.stock} {t("general.units", "unidades")}
              </p>
            </div>
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.user", "Usuario")}:</label>
              <p style={{ color: 'var(--text-dark)' }} className="">
                {product.updated_by_user?.first_name} {product.updated_by_user?.last_name}
              </p>
            </div>
          </div>

          {product.image_url && (
            <div>
              <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("general.image", "Imagen")}:</label>
              <img
                src={product.image_url}
                alt={product.name}
                className="h-48 w-48 object-cover rounded"
              />
            </div>
          )}

          {product.created_at && (
            <div className="grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">{t("products.created", "Creado")}:</label>
                <p style={{ color: 'var(--gray-600)' }} className="text-sm">
                  {new Date(product.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>
              {product.updated_at && (
                <div>
                  <label style={{ color: 'var(--text-dark)' }} className="block text-sm font-semibold mb-2">Actualizado:</label>
                  <p style={{ color: 'var(--gray-600)' }} className="text-sm">
                    {new Date(product.updated_at).toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 border-t pt-6">
            <Link
              href={localizedUrl(`/products/${product.id}/edit`)}
              style={{ backgroundColor: 'var(--primary-500)' }}
              className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
            >
              Editar
            </Link>
            <Link
              href={localizedUrl("/products")}
              style={{ backgroundColor: 'var(--gray-600)' }}
              className="hover:opacity-90 text-white px-6 py-2 rounded font-medium transition"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
