import { usePage } from '@inertiajs/react';

/**
 * Hook para obtener información del idioma actual
 * Retorna objeto con: locale, supportedLocales
 * Uso: const { locale, supportedLocales } = useLocale();
 */
export default function useLocale() {
    const { locale, supportedLocales } = usePage().props;

    return {
        locale: locale || 'en',
        supportedLocales: supportedLocales || ['en', 'es'],
    };
}
