<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'locale' => app()->getLocale(),
            'supportedLocales' => ['en', 'es'],
            'translations' => $this->getTranslations(),
            'auth' => [
            'user' => $request->user() ? [
                'id'         => $request->user()->id,
                'first_name' => $request->user()->first_name,
                'last_name'  => $request->user()->last_name,
                'email'      => $request->user()->email,
                'phone'      => $request->user()->phone,
                'bio'        => $request->user()->bio,
                'address'    => $request->user()->address,
                'role'       => $request->user()->role->value,
                'avatar'     => $request->user()->avatar ? Storage::url($request->user()->avatar) : null,
            ] : null,
        ],
        ];
    }

    /**
     * Obtiene todas las traducciones del idioma actual
     * @return array<string, array>
     */
    protected function getTranslations(): array
    {
        $locale = app()->getLocale();
        $translations = [];

        // Carga los archivos de traducción disponibles
        $langPath = resource_path("lang/{$locale}");

        if (is_dir($langPath)) {
            foreach (scandir($langPath) as $file) {
                if (str_ends_with($file, '.php')) {
                    $key = str_replace('.php', '', $file);
                    $translations[$key] = __($key);
                }
            }
        }

        return $translations;
    }
}
