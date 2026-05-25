<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    /**
     * Idiomas soportados en la aplicación
     */
    protected array $supportedLocales = ['en', 'es'];

    /**
     * Idioma por defecto
     */
    protected string $defaultLocale = 'es';

    /**
     * Procesa la solicitud para establecer el idioma
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $this->getLocale($request);

        app()->setLocale($locale);

        // Guardar en la sesión para persistencia
        session(['locale' => $locale]);

        return $next($request);
    }

    /**
     * Determina el idioma a utilizar basado en:
     * 1. Parámetro de ruta
     * 2. Sesión anterior
     * 3. Cookie
     * 4. Header Accept-Language
     * 5. Idioma por defecto
     */
    protected function getLocale(Request $request): string
    {
        // 1. Verificar parámetro de ruta
        if ($request->route() && $request->route('locale')) {
            $locale = $request->route('locale');
            if (in_array($locale, $this->supportedLocales)) {
                return $locale;
            }
        }

        // 2. Verificar sesión
        if (session('locale')) {
            $locale = session('locale');
            if (in_array($locale, $this->supportedLocales)) {
                return $locale;
            }
        }

        // 3. Verificar cookie
        if ($request->cookie('locale')) {
            $locale = $request->cookie('locale');
            if (in_array($locale, $this->supportedLocales)) {
                return $locale;
            }
        }

        // 4. Verificar Accept-Language header
        $acceptLanguage = $request->header('Accept-Language');
        if ($acceptLanguage) {
            $preferredLocale = $this->parseAcceptLanguage($acceptLanguage);
            if (in_array($preferredLocale, $this->supportedLocales)) {
                return $preferredLocale;
            }
        }

        // 5. Retornar idioma por defecto
        return $this->defaultLocale;
    }

    /**
     * Analiza el header Accept-Language para extraer el idioma preferido
     */
    protected function parseAcceptLanguage(string $acceptLanguage): string
    {
        $languages = explode(',', $acceptLanguage);

        foreach ($languages as $language) {
            $locale = explode(';', trim($language))[0];
            $lang = explode('-', $locale)[0];

            if (in_array($lang, $this->supportedLocales)) {
                return $lang;
            }
        }

        return $this->defaultLocale;
    }
}
