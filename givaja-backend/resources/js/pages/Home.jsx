import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SearchBox from "../components/SearchBox";
import { data } from "autoprefixer";

export default function Home({ products, search = "" }) {
 const [selectedProduct, setSelectedProduct] = useState(null);
console.log('products:', products);
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Buscador */}
      <div className="mb-6">
        <SearchBox
          placeholder="Buscar por nombre, descripción, precio o categoría..."
          route="/"
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

            <h2 className="font-bold mt-2">{product.name}</h2>

            <p className="text-green-600 font-semibold">
              ${Number(product.unit_price).toLocaleString()}
            </p>
          </div>
        ))}

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
      `}
    />

  ))}

</div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[500px] relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image_url}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>

            <p className="text-gray-600 mb-2">
              {selectedProduct.description}
            </p>

            <p className="font-semibold">
              Precio: ${Number(selectedProduct.unit_price).toLocaleString()}
            </p>

            <p>Stock: {selectedProduct.stock}</p>

            <p>
              Categoría: {selectedProduct.category?.name || "Sin categoría"}
            </p>

          </div>

        </div>
      )}

    </MainLayout>
  );
}
