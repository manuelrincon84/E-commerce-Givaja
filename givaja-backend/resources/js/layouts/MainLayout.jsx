import { useState, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import GlobalSearchBox from '../components/GlobalSearchBox';
import LanguageSwitcher from '../components/LanguageSwitcher';
import useTranslate from '../hooks/useTranslate';
import useLocalizedUrl from '../hooks/useLocalizedUrl';

export default function MainLayout({ children }) {
    const t = useTranslate();
    const localizedUrl = useLocalizedUrl();
    const { auth } = usePage().props;
    const user = auth?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post(localizedUrl('/logout'));
    };

    const isAdmin = user?.role === 'admin';
    const isSeller = user?.role === 'seller';

    return (
        <div style={{ backgroundColor: 'var(--gray-100)' }} className="min-h-screen">

            {/* NAVBAR */}
            <nav style={{ backgroundColor: 'var(--primary-500)' }} className="p-4 text-white flex justify-between items-center gap-6">

                <Link href={localizedUrl('/')} className="hover:opacity-80 flex items-center gap-2">
                    <img
                        src="/images/givaja.jpeg"
                        alt="Givaja"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight">Givaja</span>
                        <span className="text-xs leading-tight opacity-80">Bisutería Artesanal</span>
                    </div>
                </Link>

                {/* Buscador Global */}
                <div className="flex-1 max-w-md">
                    <GlobalSearchBox />
                </div>

                <div className="whitespace-nowrap flex items-center gap-4">
                    <Link href={localizedUrl('/home')}>{t('general.home', 'Inicio')}</Link>

                    {/* Rutas protegidas por rol */}
                    {isAdmin && (
                        <>
                            <Link href={localizedUrl('/users')}>{t('general.users', 'Usuarios')}</Link>
                            <Link href={localizedUrl('/categories')}>{t('general.categories', 'Categorías')}</Link>
                            <Link href={localizedUrl('/products')}>{t('general.products', 'Productos')}</Link>
                        </>
                    )}
                    {isSeller && (
                        <Link href={localizedUrl('/products')}>{t('general.products', 'Productos')}</Link>
                    )}

                    {/* Selector de idioma */}
                    <div className="border-l border-white pl-4">
                        <LanguageSwitcher className="!gap-1 !text-white" />
                    </div>

                    {/* User icon / dropdown */}
                    <div className="relative border-l border-white pl-4" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 hover:opacity-80 transition"
                        >
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.first_name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                />
                            ) : (
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--primary-500)' }} viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            )}
                            {user && (
                                <span className="text-sm hidden md:block">{user.first_name}</span>
                            )}
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 text-sm" style={{ backgroundColor: 'var(--gray-50)', color: 'var(--text-dark)' }}>
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                                            <p style={{ color: 'var(--text-dark)' }} className="font-semibold">{user.first_name} {user.last_name}</p>
                                            <p style={{ color: 'var(--gray-500)' }} className="text-xs">{user.email}</p>
                                        </div>
                                        <Link
                                            href={localizedUrl(`/users/${user.id}`)}
                                            className="block px-4 py-2 transition"
                                            style={{ backgroundColor: 'var(--gray-100)', color: 'var(--text-dark)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-200)' }
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-100)' }
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            {t('auth.my_profile', 'Mi perfil')}
                                        </Link>
                                        <Link
                                            href={localizedUrl('/orders')}
                                            className="block px-4 py-2 transition"
                                            style={{ backgroundColor: 'var(--gray-100)', color: 'var(--text-dark)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-200)' }
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-100)' }
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            {t('auth.my_orders', 'Mis pedidos')}
                                        </Link>
                                        <div className="border-t mt-1" style={{ borderColor: 'var(--gray-200)' }}>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 transition"
                                                style={{ backgroundColor: 'var(--gray-100)', color: 'var(--error-500)' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2' }
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-100)' }
                                            >
                                                {t('auth.logout', 'Cerrar sesión')}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={localizedUrl('/login')}
                                            className="block px-4 py-2 transition"
                                            style={{ backgroundColor: 'var(--gray-100)', color: 'var(--text-dark)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-200)' }
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-100)' }
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            {t('auth.login_btn', 'Iniciar sesión')}
                                        </Link>
                                        <Link
                                            href={localizedUrl('/register')}
                                            className="block px-4 py-2 transition"
                                            style={{ backgroundColor: 'var(--gray-100)', color: 'var(--text-dark)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-200)' }
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-100)' }
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            {t('auth.register_btn', 'Crear cuenta')}
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
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
