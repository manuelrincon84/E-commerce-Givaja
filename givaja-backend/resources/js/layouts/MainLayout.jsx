import { Link } from '@inertiajs/react';
import GlobalSearchBox from '../components/GlobalSearchBox';
import LanguageSwitcher from '../components/LanguageSwitcher';
import useTranslate from '../hooks/useTranslate';
import useLocalizedUrl from '../hooks/useLocalizedUrl';

export default function MainLayout({ children }) {
  const t = useTranslate();
  const localizedUrl = useLocalizedUrl();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-green-400 p-4 text-white flex justify-between items-center gap-6">

        <Link href={localizedUrl('/')} className="font-bold text-lg whitespace-nowrap hover:opacity-80">
          Givaja
        </Link>

        {/* Buscador Global */}
        <div className="flex-1 max-w-md">
          <GlobalSearchBox />
        </div>

        <div className="space-x-4 whitespace-nowrap flex items-center gap-4">
            <Link href={localizedUrl('/home')}>{t('general.home', 'Inicio')}</Link>
          <Link href={localizedUrl('/users')}>{t('general.users', 'Usuarios')}</Link>
          <Link href={localizedUrl('/categories')}>{t('general.categories', 'Categorías')}</Link>
          <Link href={localizedUrl('/products')}>{t('general.products', 'Productos')}</Link>

          {/* Selector de idioma */}
          <div className="border-l border-white pl-4">
            <LanguageSwitcher className="!gap-1 !text-white" />
          </div>
        </div>

      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        {children}
      </main>

    </div>
  );
}
