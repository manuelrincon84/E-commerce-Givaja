import React from 'react';
import ApiProductsTable from '@/Components/ApiProductsTable';

export default function ApiProductsTest() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Probar API de Productos</h1>
            <ApiProductsTable />
        </div>
    );
}
