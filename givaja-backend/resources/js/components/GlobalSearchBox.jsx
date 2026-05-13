import SearchBox from './SearchBox';
import { useContextualSearch } from '../hooks/useContextualSearch';
import { usePage } from '@inertiajs/react';

/**
 * Componente de búsqueda global que se adapta según la ruta actual
 */
export default function GlobalSearchBox() {
  const searchConfig = useContextualSearch();
  const { props } = usePage();

  // Obtener el valor actual del parámetro search de los props
  const currentSearch = props.search || '';

  return (
    <SearchBox
      placeholder={searchConfig.placeholder}
      route={searchConfig.route}
      queryParam={searchConfig.queryParam}
      debounceDelay={searchConfig.debounceDelay}
      initialValue={currentSearch}
    />
  );
}
