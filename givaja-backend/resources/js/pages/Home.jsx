import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Home({ products }) {
 const [selectedProduct, setSelectedProduct] = useState(null);
console.log('products:', products);
  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">Productos</h1>

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
