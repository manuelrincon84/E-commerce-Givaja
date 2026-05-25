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
          <h2 className="text-3xl font-bold text-gray-800">{t("products.product_details")}</h2>
          <Link
            href={localizedUrl("/products")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
          >
            {t("general.back", "Volver")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID:</label>
              <p className="text-gray-900">{product.id}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.category")}:</label>
              <p className="text-gray-900">{product.category?.name || t("general.no_category", "Sin categoría")}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("general.name", "Nombre")}:</label>
            <p className="text-gray-900">{product.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.description", "Descripción")}:</label>
            <p className="text-gray-900">{product.description || t("general.no_description", "Sin descripción")}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.price", "Precio")}:</label>
              <p className="text-gray-900 font-semibold">
                ${Number(product.unit_price).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.stock", "Stock")}:</label>
              <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock} {t("general.units", "unidades")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.user", "Usuario")}:</label>
              <p className="text-gray-900">
                {product.updated_by_user?.first_name} {product.updated_by_user?.last_name}
              </p>
            </div>
          </div>

          {product.image_url && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("general.image", "Imagen")}:</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("products.created", "Creado")}:</label>
                <p className="text-gray-600 text-sm">
                  {new Date(product.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>
              {product.updated_at && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Actualizado:</label>
                  <p className="text-gray-600 text-sm">
                    {new Date(product.updated_at).toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 border-t pt-6">
            <Link
              href={localizedUrl(`/products/${product.id}/edit`)}
              className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded font-medium transition"
            >
              Editar
            </Link>
            <Link
              href={localizedUrl("/products")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
