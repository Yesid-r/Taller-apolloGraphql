import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const CardProduct = ({ product }) => {
    const handleClick = () => {
        console.log(product.id); 
        //navegar 
        window.location.href = `/products/${product.id}`; 
    };

    return (
        <Card className="w-72 m-3">
            <CardHeader shadow={false} floated={false} className="h-72">
                <img
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography onClick={handleClick} color="blue-gray " className="font-medium cursor-pointer hover:text-blue-600">
                        {product.title} 
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        ${product.price.toFixed(2)} 
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {product.description} 
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </Button>

            </CardFooter>
        </Card>
    );
}

export default CardProduct;
