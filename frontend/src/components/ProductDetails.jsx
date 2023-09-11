import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const [productEdit, setProductEdit] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const handleFieldChange = (fieldName, value) => {
        setProductEdit({ ...productEdit, [fieldName]: value });
    };


    const handleSave = () => {
        const variables = {
            updateProductId: id,
            title: productEdit.title,
            stock: productEdit.stock,
            description: productEdit.description,
            price: productEdit.price,
            discountPercentage: productEdit.discountPercentage,
            rating: productEdit.rating,
            brand: productEdit.brand,
            category: productEdit.category,
            thumbnail: productEdit.thumbnail,
            images: productEdit.images,
        }
        const query = `
        mutation UpdateProduct(
            $updateProductId: Int!
            $title: String
            $stock: Int
            $description: String
            $price: Float
            $discountPercentage: Float
            $rating: Float
            $brand: String
            $category: String
            $thumbnail: String
            $images: [String]
        ) {
            updateProduct(
            id: $updateProductId
            title: $title
            stock: $stock
            description: $description
            price: $price
            discountPercentage: $discountPercentage
            rating: $rating
            brand: $brand
            category: $category
            thumbnail: $thumbnail
            images: $images
            ) {
            title
            stock
            description
            thumbnail
            images
            discountPercentage
            }
        }
        `;

        console.log('Guardar cambios:', productEdit);
        const serverUrl = 'http://localhost:4000';


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        };


        fetch(serverUrl, requestOptions)
            .then(response => response.json())
            .then(data => {

                console.log('Respuesta de la mutación:', data);
                alert('Producto actualizado correctamente');
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });

        setIsEditing(false);
    };
    useEffect(() => {

        const query = `
        query FindProduct($productId: Int!) {
            findProduct(id: $productId) {
            title
            description
            price
            discountPercentage
            rating
            stock
            brand
            category
            thumbnail
            images
            }
        }
        `;

        fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { productId: parseInt(id) },
            }),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp.data);
                setProduct(resp.data.findProduct);
                setProductEdit(resp.data.findProduct)
            });
    }, [id]);
    const handleDelete = async (e) => {
        e.preventDefault()
        const query = `
  query Query($deleteProductId: Int!) {
    deleteProduct(id: $deleteProductId)
  }
`;

        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                query,
                variables: { deleteProductId: parseInt(id) },
            })
        };

        
        const serverUrl = `${BASE_URL}`; 

        
        fetch(serverUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                
                console.log(data);
                alert(`data: ${data.data.deleteProduct}`);
                
            })
            .catch(error => {
                
                console.error('Error:', error);
            });
            
            window.location.href = `/products`;

    };

    return (
        <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <img
                        src={productEdit.thumbnail}
                        alt={productEdit.title}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                    {productEdit.images && productEdit.images.length > 0 && (
                        <div className="grid grid-cols-5 gap-1 mt-2">
                            {productEdit.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">
                        {isEditing ? (
                            <input
                                type="text"
                                className="w-full border-b-2 border-blue-500 outline-none"
                                value={productEdit.title}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                            />
                        ) : (
                            productEdit.title
                        )}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isEditing ? (
                            <textarea
                                className="w-full h-20 border-2 border-gray-300 rounded p-2"
                                value={productEdit.description}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />
                        ) : (
                            productEdit.description
                        )}
                    </p>
                    <div className="mt-4 flex items-center">
                        <span className="text-xl font-bold text-red-500 mr-2">
                            ${isEditing ? (
                                <input
                                    type="number"
                                    className="w-16 border-2 border-gray-300 rounded p-1"
                                    value={productEdit.price}
                                    onChange={(e) => handleFieldChange('price', parseFloat(e.target.value))}
                                />
                            ) : (
                                productEdit.price
                            )}
                        </span>
                        {productEdit.discountPercentage > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                                ${((productEdit.price / (1 - productEdit.discountPercentage / 100)).toFixed(2))}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">
                            {Array.from({ length: Math.floor(productEdit.rating) }, (_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-yellow-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ))}
                        </span>
                        <span className="text-gray-500 ml-2">
                            ({productEdit.rating})
                        </span>
                    </div>
                    <p className="text-gray-600 mt-4">
                        <span className="font-semibold">Brand:</span> {isEditing ? (
                            <input
                                type="text"
                                className="border-2 border-gray-300 rounded p-1"
                                value={productEdit.brand}
                                onChange={(e) => handleFieldChange('brand', e.target.value)}
                            />
                        ) : (
                            productEdit.brand
                        )}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Category:</span> {isEditing ? (
                            <input
                                type="text"
                                className="border-2 border-gray-300 rounded p-1"
                                value={productEdit.category}
                                onChange={(e) => handleFieldChange('category', e.target.value)}
                            />
                        ) : (
                            productEdit.category
                        )}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Stock:</span> {isEditing ? (
                            <input
                                type="number"
                                className="border-2 border-gray-300 rounded p-1"
                                value={productEdit.stock}
                                onChange={(e) => handleFieldChange('stock', parseInt(e.target.value))}
                            />
                        ) : (
                            productEdit.stock
                        )}{' '}
                        units
                    </p>


                    {/* Botones de Modificar y Guardar */}
                    {!isEditing ? (
                        <div className="mt-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Editar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="m-3 inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            >
                                Eliminar
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="inline-block px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
