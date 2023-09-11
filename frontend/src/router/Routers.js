import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Products from '../components/Products'
import ProductDetails from '../components/ProductDetails'
import RegisterProduct from '../components/RegisterProduct'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/register-product' element={<RegisterProduct/>}/>
    </Routes>
  )
}

export default Routers