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
          style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-500)' }}
          className={`${baseClass} border-2 rounded hover:opacity-80 transition`}
        >
          Ver
        </button>
      )}

      {editHref && (
        <Link
          href={editHref}
          style={{ backgroundColor: 'var(--primary-500)' }}
          className={`${baseClass} text-white rounded hover:opacity-80 transition inline-block`}
        >
          Editar
        </Link>
      )}

      {onDelete && (
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'var(--error-500)' }}
          className={`${baseClass} text-white rounded hover:opacity-80 transition`}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
