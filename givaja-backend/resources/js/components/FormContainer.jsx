export default function FormContainer({ title, children, onSubmit, submitText = "Guardar", cancelHref, isLoading = false }) {
  return (
    <div style={{ backgroundColor: 'var(--gray-100)' }} className="flex justify-center items-center min-h-screen">
      <div style={{ backgroundColor: 'var(--gray-100)', borderColor: 'var(--primary-500)' }} className="p-6 rounded-2xl shadow-lg w-full max-w-3xl border-2">
        <h2 style={{ color: 'var(--text-dark)' }} className="text-2xl font-bold text-center mb-6">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: 'var(--primary-500)' }}
              className="hover:opacity-90 text-white px-8 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Guardando..." : submitText}
            </button>

            {cancelHref && (
              <a
                href={cancelHref}
                style={{ backgroundColor: 'var(--gray-600)' }}
                className="hover:opacity-90 text-white px-8 py-2 rounded font-medium transition"
              >
                Cancelar
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
