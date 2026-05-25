/**
 * Utilidades para manejo de localización y URLs
 */

/**
 * Obtiene el idioma actual de la URL
 */
export function getLocaleFromUrl() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const locale = pathSegments[0];
    return ['en', 'es'].includes(locale) ? locale : 'en';
}

/**
 * Construye una URL con el prefijo de idioma
 */
export function buildLocalizedUrl(path, locale = null) {
    const currentLocale = locale || getLocaleFromUrl();
    const cleanPath = path.replace(/^\/(?:en|es)/, '');
    const finalPath = cleanPath || '/';
    return `/${currentLocale}${finalPath}`;
}

/**
 * Reemplaza el prefijo de idioma en una URL
 */
export function switchLocaleInUrl(locale) {
    const path = window.location.pathname;
    const currentLocale = getLocaleFromUrl();
    return path.replace(new RegExp(`^/${currentLocale}`), `/${locale}`);
}

/**
 * Obtiene todos los idiomas disponibles
 */
export function getSupportedLocales() {
    return ['en', 'es'];
}

/**
 * Comprueba si un idioma es soportado
 */
export function isSupportedLocale(locale) {
    return getSupportedLocales().includes(locale);
}
