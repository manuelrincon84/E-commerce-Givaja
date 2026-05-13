import { Link } from "@inertiajs/react";

export default function ActionButtons({ showHref, editHref, onDelete, compact = false }) {
  const baseClass = compact
    ? "btn-sm px-2 py-1 text-xs"
    : "px-3 py-2 text-sm";

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      onDelete();
    }
  };

  return (
    <div className={`flex gap-2 ${compact ? "flex-wrap" : ""}`}>
      {showHref && (
        <button
          onClick={() => setSelectedItem && setSelectedItem(true)}
          className={`${baseClass} border-2 border-green-400 text-green-400 rounded hover:bg-green-50 transition`}
        >
          Ver
        </button>
      )}

      {editHref && (
        <Link
          href={editHref}
          className={`${baseClass} bg-green-400 text-white rounded hover:bg-green-500 transition inline-block`}
        >
          Editar
        </Link>
      )}

      {onDelete && (
        <button
          onClick={handleDelete}
          className={`${baseClass} bg-red-500 text-white rounded hover:bg-red-600 transition`}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
