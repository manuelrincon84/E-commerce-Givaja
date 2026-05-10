export default function FormContainer({ title, children, onSubmit, submitText = "Guardar", cancelHref, isLoading = false }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-6 rounded-2xl shadow-lg w-full max-w-3xl border-2 border-green-400">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-400 hover:bg-green-500 text-white px-8 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Guardando..." : submitText}
            </button>

            {cancelHref && (
              <a
                href={cancelHref}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 rounded font-medium transition"
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
