#!/bin/bash

# Script de inicialización para soporte multiidioma
# Este script verifica y establece la configuración básica

echo "🌐 Inicializando soporte multiidioma..."

# Verificar que los directorios de traducciones existen
if [ ! -d "resources/lang/en" ]; then
    echo "❌ Error: resources/lang/en no existe"
    exit 1
fi

if [ ! -d "resources/lang/es" ]; then
    echo "❌ Error: resources/lang/es no existe"
    exit 1
fi

echo "✅ Directorios de traducciones encontrados"

# Verificar archivos de traducción
TRANSLATION_FILES=("general" "products" "cart" "orders")
LOCALES=("en" "es")

for locale in "${LOCALES[@]}"; do
    for file in "${TRANSLATION_FILES[@]}"; do
        if [ ! -f "resources/lang/$locale/$file.php" ]; then
            echo "⚠️ Advertencia: resources/lang/$locale/$file.php no existe"
        fi
    done
done

echo "✅ Archivos de traducción verificados"

# Verificar middleware
if [ ! -f "app/Http/Middleware/SetLocale.php" ]; then
    echo "❌ Error: Middleware SetLocale no encontrado"
    exit 1
fi

echo "✅ Middleware SetLocale encontrado"

# Verificar controlador
if [ ! -f "app/Http/Controllers/LocaleController.php" ]; then
    echo "❌ Error: LocaleController no encontrado"
    exit 1
fi

echo "✅ LocaleController encontrado"

# Limpiar caché
echo "🔄 Limpiando caché de la aplicación..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

echo ""
echo "✨ ¡Inicialización completada exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Actualiza tus componentes React para usar useTranslate()"
echo "2. Agrega LanguageSwitcher en tu layout"
echo "3. Prueba los cambios con: npm run dev"
echo ""
echo "📖 Para más información, consulta: I18N_GUIDE.md"
