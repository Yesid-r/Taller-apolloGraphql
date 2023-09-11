import React, { useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import { BASE_URL } from '../utils/constants';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(10); 

    useEffect(() => {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query: "{ products { id title description price discountPercentage rating stock brand category thumbnail images } }" })
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.data);
                setProducts(resp.data.products);
            });
    }, []);

    const loadMoreProducts = () => {
        
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10);
    };

    return (
        <div>
            <div className="flex flex-wrap justify-center p-6">
                {products.slice(0, visibleProducts).map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}

            </div>
            {visibleProducts < products.length && (
                <div className="text-center m-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={loadMoreProducts}
                    >
                        Mostrar más
                    </button>
                </div>
            )}
        </div>

    );
}

export default Products;
