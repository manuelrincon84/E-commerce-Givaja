import useLocale from './useLocale';

/**
 * Hook para obtener URLs con prefijo de idioma
 * Uso: const localizedUrl = useLocalizedUrl();
 *      localizedUrl('/products')      // /es/products (si locale es es)
 *      localizedUrl('/products', 'en') // /en/products
 */
export default function useLocalizedUrl() {
    const { locale } = useLocale();

    const localizeUrl = (path, targetLocale = null) => {
        const currentLocale = targetLocale || locale;

        // Si la ruta ya comienza con un idioma conocido, reemplazarlo
        const localePattern = /^\/(?:en|es)(\/|$)/;
        let cleanPath = path.replace(localePattern, '');

        // Asegurarse de que la ruta comienza con /
        if (!cleanPath.startsWith('/')) {
            cleanPath = '/' + cleanPath;
        }

        return `/${currentLocale}${cleanPath}`;
    };

    return localizeUrl;
}
