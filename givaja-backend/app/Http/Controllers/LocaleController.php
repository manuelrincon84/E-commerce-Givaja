<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LocaleController extends Controller
{
    /**
     * Idiomas soportados en la aplicación
     */
    protected array $supportedLocales = ['en', 'es'];

    /**
     * Cambia el idioma de la aplicación
     */
    public function change(Request $request, string $locale)
    {
        // Validar que el idioma sea soportado
        if (!in_array($locale, $this->supportedLocales)) {
            abort(404, 'Unsupported locale');
        }

        // Guardar en sesión
        session(['locale' => $locale]);

        // Guardar en cookie por 1 año
        $cookie = cookie()->make(
            'locale',
            $locale,
            60 * 24 * 365,
            path: '/',
            httpOnly: true,
            sameSite: 'lax'
        );

        $referer = $request->header('referer');
        $redirectUrl = $referer ?? route('home', ['locale' => $locale]);

        // Extraer la URL y remover el prefijo de idioma anterior si existe
        $url = parse_url($redirectUrl, PHP_URL_PATH);
        foreach ($this->supportedLocales as $supportedLocale) {
            if (str_starts_with($url, "/{$supportedLocale}")) {
                $url = substr($url, strlen($supportedLocale) + 1);
                break;
            }
        }

        // Agregar prefijo del nuevo idioma
        $newUrl = "/{$locale}{$url}";

        return redirect($newUrl)->cookie($cookie);
    }

    /**
     * Retorna los idiomas soportados como JSON
     */
    public function supported()
    {
        return response()->json([
            'supported' => $this->supportedLocales,
            'current' => app()->getLocale(),
        ]);
    }
}
