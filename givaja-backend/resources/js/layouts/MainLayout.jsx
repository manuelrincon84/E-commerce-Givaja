import GlobalSearchBox from '../components/GlobalSearchBox';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-green-400 p-4 text-white flex justify-between items-center gap-6">

        <a href="/" className="font-bold text-lg whitespace-nowrap">
          Givaja
        </a>

        {/* Buscador Global */}
        <div className="flex-1 max-w-md">
          <GlobalSearchBox />
        </div>

        <div className="space-x-4 whitespace-nowrap">
            <a href="/home">Inicio </a>
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
