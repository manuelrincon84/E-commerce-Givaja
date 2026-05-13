import { usePage } from '@inertiajs/react';

/**
 * Hook que detecta la ruta actual y retorna la configuración
 * apropiada para el SearchBox contextual
 */
export function useContextualSearch() {
  const { url } = usePage();

  // Extraer la ruta base (primera parte después de /)
  const route = url.split('?')[0]; // Remover query params
  const baseRoute = route.split('/')[1]; // Primera parte de la ruta

  // Configuración por ruta
  const searchConfigs = {
    products: {
      placeholder: 'Buscar productos por nombre, descripción o precio...',
      route: '/products',
      queryParam: 'search',
      debounceDelay: 300,
    },
    categories: {
      placeholder: 'Buscar categorías por nombre...',
      route: '/categories',
      queryParam: 'search',
      debounceDelay: 300,
    },
    users: {
      placeholder: 'Buscar usuarios por nombre o email...',
      route: '/users',
      queryParam: 'search',
      debounceDelay: 300,
    },
    orders: {
      placeholder: 'Buscar órdenes por ID o cliente...',
      route: '/orders',
      queryParam: 'search',
      debounceDelay: 300,
    },
    customizations: {
      placeholder: 'Buscar personalizaciones...',
      route: '/customizations',
      queryParam: 'search',
      debounceDelay: 300,
    },
    payments: {
      placeholder: 'Buscar pagos por ID o cliente...',
      route: '/payments',
      queryParam: 'search',
      debounceDelay: 300,
    },
    // Rutas públicas
    '': { // Home o raíz
      placeholder: 'Buscar productos por nombre, descripción o precio...',
      route: '/',
      queryParam: 'search',
      debounceDelay: 300,
    },
    home: {
      placeholder: 'Buscar productos por nombre, descripción o precio...',
      route: '/',
      queryParam: 'search',
      debounceDelay: 300,
    },
  };

  // Retornar config según la ruta, o config por defecto si no existe
  return searchConfigs[baseRoute] || {
    placeholder: 'Buscar...',
    route: '/',
    queryParam: 'search',
    debounceDelay: 300,
  };
}
