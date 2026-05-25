import { usePage } from '@inertiajs/react';

/**
 * Hook para acceder a las traducciones
 * Uso: const t = useTranslate();
 *      t('general.hello')  // Accede a general.hello
 *      t('products.title') // Accede a products.title
 */
export default function useTranslate() {
    const { translations = {} } = usePage().props;

    const t = (key, defaultValue = null) => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }

        return value;
    };

    return t;
}
