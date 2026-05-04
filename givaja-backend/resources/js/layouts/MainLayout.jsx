export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-green-400 p-4 text-white flex justify-between">

        <a href="/" className="font-bold text-lg">
          Givaja
        </a>

        <div className="space-x-4">
          <a href="/users">Usuarios</a>
          <a href="/categories">Categorías</a>
          <a href="/products">Productos</a>
        </div>

      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        {children}
      </main>

    </div>
  );
}
