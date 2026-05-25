import React, { useState } from 'react';
import useLocale from '../hooks/useLocale';
import useTranslate from '../hooks/useTranslate';

/**
 * Componente para cambiar el idioma de la aplicación
 * Uso: <LanguageSwitcher />
 */
export default function LanguageSwitcher({ className = '' }) {
    const { locale, supportedLocales } = useLocale();
    const t = useTranslate();
    const [isChanging, setIsChanging] = useState(false);

    const handleChangeLocale = (newLocale) => {
        if (newLocale === locale || isChanging) return;

        setIsChanging(true);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/locale/${newLocale}`;

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        if (csrfToken) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = csrfToken;
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    };

    const localeLabels = {
        'en': t('general.english', 'English'),
        'es': t('general.spanish', 'Español'),
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <select
                value={locale}
                onChange={(e) => handleChangeLocale(e.target.value)}
                disabled={isChanging}
                className="px-2 py-1 border border-white bg-transparent text-white rounded text-sm cursor-pointer hover:bg-white hover:bg-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {supportedLocales.map((loc) => (
                    <option key={loc} value={loc} className="text-gray-800">
                        {localeLabels[loc] || loc}
                    </option>
                ))}
            </select>
        </div>
    );
}
