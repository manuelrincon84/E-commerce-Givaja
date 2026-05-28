import { useState } from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "../layouts/MainLayout";
import SearchBox from "../components/SearchBox";
import useTranslate from "../hooks/useTranslate";
import useLocalizedUrl from "../hooks/useLocalizedUrl";

export default function Home({ products, search = "" }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const t = useTranslate();
  const localizedUrl = useLocalizedUrl();

  return (
    <MainLayout>
      <h1 style={{ color: 'var(--text-dark)' }} className="text-2xl font-bold mb-6">{t('products.title', 'Productos')}</h1>

      {/* Buscador */}
      <div className="mb-6">
        <SearchBox
          placeholder={t('general.search', 'Buscar...')}
          route={localizedUrl('/products')}
          queryParam="search"
          initialValue={search}
          debounceDelay={300}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products?.data?.map(product => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 transition"
          >
            <img
              src={product.image_url || "https://via.placeholder.com/300"}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 style={{ color: 'var(--text-dark)' }} className="font-bold mt-2">{product.name}</h2>

            <p style={{ color: 'var(--primary-500)' }} className="font-semibold">
              ${Number(product.unit_price).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
      <div className="flex justify-center gap-2 mt-8">

  {products.links.map((link, index) => (
    link.url ? (
      <Link
        key={index}
        href={localizedUrl(link.url)}
        dangerouslySetInnerHTML={{ __html: link.label }}
        className={`
          px-4 py-2 rounded border
          ${
            link.active
            ? 'text-white'
            : 'text-gray-700 hover:bg-gray-100'
          }`}
        style={{
          backgroundColor: link.active ? 'var(--primary-500)' : 'white',
          borderColor: link.active ? 'var(--primary-500)' : 'var(--gray-300)'
        }}
      />
    ) : (
      <span
        key={index}
        dangerouslySetInnerHTML={{ __html: link.label }}
        style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-500)' }}
        className="px-4 py-2 rounded border opacity-50"
      />
    )
  ))}

</div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[500px] relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-2xl"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image_url}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 style={{ color: 'var(--text-dark)' }} className="text-xl font-bold">{selectedProduct.name}</h2>

            <p style={{ color: 'var(--gray-600)' }} className="mb-2">
              {selectedProduct.description}
            </p>

            <p style={{ color: 'var(--text-dark)' }} className="font-semibold">
              {t('general.price', 'Precio')}: ${Number(selectedProduct.unit_price).toLocaleString()}
            </p>

            <p style={{ color: 'var(--text-dark)' }}>{t('products.stock', 'Stock')}: {selectedProduct.stock}</p>

            <p style={{ color: 'var(--text-dark)' }}>
              {t('products.category', 'Categoría')}: {selectedProduct.category?.name || t('general.no_results', 'Sin categoría')}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 w-full text-white py-2 rounded hover:opacity-90"
              style={{ backgroundColor: 'var(--primary-500)' }}
            >
              {t('general.cancel', 'Cerrar')}
            </button>

          </div>

        </div>
      )}

    </MainLayout>
  );
}
