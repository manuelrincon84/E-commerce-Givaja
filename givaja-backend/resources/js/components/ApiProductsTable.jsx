import React, { useState } from 'react';

const ApiProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = () => {
        setLoading(true);
        setError(null);
        fetch('/api/v1/products')
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener productos');
                return response.json();
            })
            .then((data) => {
                setProducts(data.data || []);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Probar API de Productos</h2>
            <button onClick={fetchProducts} disabled={loading}>
                {loading ? 'Cargando...' : 'Obtener productos'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table border="1" style={{ marginTop: 16, width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && !loading ? (
                        <tr>
                            <td colSpan="5">No hay productos</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.unit_price}</td>
                                <td>{product.category_id}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApiProductsTable;
