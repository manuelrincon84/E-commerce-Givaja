# Givaja E-Commerce

Plataforma de e-commerce moderna y escalable construida con **Laravel 13** y **React 19** para una experiencia de usuario excepcional.

## 📋 Descripción

Givaja es una aplicación de e-commerce completa que permite:
- 🛍️ Navegación y compra de productos
- 🛒 Carrito de compras inteligente
- 💳 Procesamiento de pagos
- 👥 Gestión de usuarios y autenticación
- 📦 Gestión de órdenes y entregas
- 🎨 Personalizaciones de productos
- 🌍 Soporte multiidioma (i18n)
- 🎯 Categorización avanzada de productos

## 🚀 Stack Tecnológico

### Backend
- **Laravel 13** - Framework PHP de última generación
- **Inertia.js** - Puente reactivo entre Laravel y React
- **PHP 8.3+** - Lenguaje de programación
- **MySQL** - Base de datos

### Frontend
- **React 19** - Librería de UI
- **Tailwind CSS** - Framework de estilos
- **Vite** - Build tool moderno
- **Axios** - Cliente HTTP

### Herramientas de Desarrollo
- **Laravel Debugbar** - Herramienta de depuración
- **PHPUnit** - Testing para backend
- **Laravel Pint** - Code formatter

## 📦 Requisitos Previos

- PHP 8.3 o superior
- Composer
- Node.js 18+ y npm/yarn
- MySQL 8.0+
- Git

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/manuelrincon84/E-commerce-Givaja.git
cd givaja-backend
```

### 2. Instalar dependencias de PHP
```bash
composer install
```

### 3. Instalar dependencias de Node.js
```bash
npm install
```

### 4. Configurar ambiente
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configurar base de datos
Edita `.env` con tus credenciales de base de datos, luego ejecuta:
```bash
php artisan migrate
php artisan seed
```

## 🏃 Ejecutar en Desarrollo

### Terminal 1 - Servidor Laravel
```bash
php artisan serve
```

### Terminal 2 - Servidor de desarrollo Vite
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8000`

## 🔨 Compilar para Producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
givaja-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Controladores de la API
│   │   └── Middleware/      # Middleware personalizado
│   ├── Models/              # Modelos de Eloquent
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Category.php
│   │   ├── Order.php
│   │   ├── Cart.php
│   │   ├── Payment.php
│   │   └── Customization.php
│   └── Traits/              # Traits reutilizables
├── database/
│   ├── migrations/          # Migraciones de BD
│   ├── seeders/             # Seeders para datos iniciales
│   └── factories/           # Factories para testing
├── resources/
│   ├── js/                  # Componentes React
│   └── views/               # Vistas Inertia
├── routes/
│   └── web.php              # Rutas web
├── config/                  # Configuración de la app
└── tests/                   # Tests automatizados
```

## 🗂️ Modelos Principales

| Modelo | Descripción |
|--------|-------------|
| **User** | Usuarios del sistema (clientes) |
| **Product** | Productos disponibles en la tienda |
| **Category** | Categorías de productos |
| **Cart** | Carrito de compras del usuario |
| **CartItem** | Items dentro del carrito |
| **Order** | Pedidos realizados |
| **OrderDetail** | Detalles de cada pedido |
| **Payment** | Información de pagos |
| **Customization** | Personalizaciones de productos |

## 🌐 Funcionalidades Principales

- ✅ Autenticación de usuarios
- ✅ Catálogo de productos con búsqueda
- ✅ Carrito de compras persistente
- ✅ Sistema de órdenes
- ✅ Procesamiento de pagos
- ✅ Personalización de productos
- ✅ Sistema multiidioma
- ✅ Gestión de categorías
- ✅ Soporte de imágenes de productos

## 🔌 API Endpoints Principales

- `GET /api/products` - Listar productos
- `GET /api/categories` - Listar categorías
- `POST /api/cart` - Agregar al carrito
- `GET /api/orders` - Listar órdenes del usuario
- `POST /api/payments` - Procesar pago
- `PUT /api/profile` - Actualizar perfil de usuario

## 🧪 Testing

```bash
# Ejecutar tests
php artisan test

# Con cobertura de código
php artisan test --coverage
```

## 📝 Formato de Código

```bash
# Verificar formato
./vendor/bin/pint --test

# Corregir formato automáticamente
./vendor/bin/pint
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para preguntas o problemas, por favor abre un issue en el repositorio.

---

**Última actualización:** Mayo 2026

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
