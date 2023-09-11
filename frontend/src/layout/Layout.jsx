import React from 'react'
import Navbar from '../components/Navbar'
import Router from '../router/Routers'
import Footer from '../components/Footer'


const Layout = () => {
  return (
    <>
        <Navbar />
        
        <Router />
        
        
        <Footer />
        
    </>
  )
}

export default Layout