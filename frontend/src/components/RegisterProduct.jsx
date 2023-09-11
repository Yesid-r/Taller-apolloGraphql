import React, { useState } from 'react';

const RegisterProduct = () => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        

        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:4000'; 
        const requestBody = {
            query: `
                mutation CreateProduct($input: ProductInput!) {
                    createProduct(input: $input) {
                        brand
                        category
                        description
                        discountPercentage
                        id
                        images
                        price
                        rating
                        stock
                        thumbnail
                        title
                    }
                }
            `,
            variables: {
                input: productData,
            },
        };
console.log(typeof(productData.price))
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();
            console.log(responseData)

            if (response.status === 200) {
                
                console.log('Producto creado exitosamente:', responseData.data.createProduct);
                alert('Producto creado exitosamente');
                setProductData({
                    title: '',
                    description: '',
                    price: 0,
                    stock: 0,
                });
            } else {

                console.error('Error al crear el producto:', responseData.errors);
                alert('Error al crear el producto');
            }
        } catch (error) {

            console.error('Error al realizar la solicitud:', error.message);
            alert('Error al realizar la solicitud');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Registrar Nuevo Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-600">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-600">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-gray-600">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="discountPercentage" className="block text-gray-600">Porcentaje de Descuento</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={productData.discountPercentage}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-gray-600">Calificación</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={productData.rating}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-gray-600">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brand" className="block text-gray-600">Marca</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-gray-600">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="thumbnail" className="block text-gray-600">URL de Imagen (Thumbnail)</label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        value={productData.thumbnail}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Registrar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterProduct;
