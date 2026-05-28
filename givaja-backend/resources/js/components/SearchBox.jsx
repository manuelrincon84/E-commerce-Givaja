import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { router, usePage } from "@inertiajs/react";

/**
 * Componente reutilizable de búsqueda
 * @param {Object} props
 * @param {string} props.placeholder - Texto del placeholder (default: detectado por ruta)
 * @param {string} props.route - Ruta a la que enviar la búsqueda (default: detectada por ruta actual)
 * @param {string} props.queryParam - Nombre del parámetro de query (default: 'search')
 * @param {number} props.debounceDelay - Delay en ms para la búsqueda (default: 300ms)
 * @param {string} props.initialValue - Valor inicial del input
 * @param {Function} props.onSearch - Callback cuando se realiza una búsqueda
 */
export default function SearchBox({
  placeholder = null,
  route = null,
  queryParam = "search",
  debounceDelay = 300,
  initialValue = "",
  onSearch = null,
}) {
  const { url } = usePage();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Detectar la ruta si no se proporcionó
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const debouncedSearch = useDebouncedCallback((value) => {
    if (onSearch) {
      onSearch(value);
    } else if (route) {
      if (value.trim() === "") {
        router.get(route, {}, { preserveScroll: true, only: ['products', 'categories', 'users', 'orders', 'customizations', 'payments', 'search'] });
      } else {
        router.get(route, { [queryParam]: value }, { preserveScroll: true, only: ['products', 'categories', 'users', 'orders', 'customizations', 'payments', 'search'] });
      }
    }
  }, debounceDelay);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    debouncedSearch("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ '--tw-ring-color': 'var(--primary-500)' }}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
        {!searchTerm && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            🔍
          </span>
        )}
      </div>
    </div>
  );
}
