<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    /**
     * Realiza una búsqueda en múltiples campos del modelo.
     * 
     * @param Builder $query
     * @param string $search - El término de búsqueda
     * @param array $fields - Los campos en los que buscar
     * @return Builder
     */
    public function scopeSearch(Builder $query, string $search, array $fields = []): Builder
    {
        if (empty($search)) {
            return $query;
        }

        // Si no se especifican campos, usar los del modelo
        if (empty($fields)) {
            $fields = $this->getSearchableFields();
        }

        $search = "%{$search}%";

        return $query->where(function ($q) use ($search, $fields) {
            foreach ($fields as $field) {
                $q->orWhere($field, 'like', $search);
            }
        });
    }

    /**
     * Retorna los campos en los que se puede buscar por defecto.
     * Puede ser sobrescrito en cada modelo.
     * 
     * @return array
     */
    protected function getSearchableFields(): array
    {
        return property_exists($this, 'searchable') 
            ? $this->searchable 
            : [];
    }

    /**
     * Busca por un campo específico con un operador.
     * 
     * @param Builder $query
     * @param string $field
     * @param string $value
     * @param string $operator
     * @return Builder
     */
    public function scopeSearchField(Builder $query, string $field, string $value, string $operator = 'like'): Builder
    {
        if (empty($value)) {
            return $query;
        }

        $value = $operator === 'like' ? "%{$value}%" : $value;

        return $query->where($field, $operator, $value);
    }
}
