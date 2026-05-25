import { useState } from 'react';
import useLocale from './useLocale';

/**
 * Hook para cambiar el idioma
 * Uso: const { changeLocale, isChanging } = useChangeLocale();
 *      changeLocale('es');
 */
export default function useChangeLocale() {
    const { locale } = useLocale();
    const [isChanging, setIsChanging] = useState(false);

    const changeLocale = async (newLocale) => {
        if (newLocale === locale || isChanging) return;

        setIsChanging(true);

        try {
            const response = await fetch(`/locale/${newLocale}`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
                },
            });

            if (response.ok) {
                // Recargar la página con el nuevo idioma
                window.location.reload();
            }
        } catch (error) {
            console.error('Error changing locale:', error);
        } finally {
            setIsChanging(false);
        }
    };

    return { changeLocale, isChanging };
}
