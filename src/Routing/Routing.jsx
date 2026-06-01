import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from '../Pages/HomePage'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Auth from '../Auth/Auth'
import ViewProduct from '../Components/ViewProduct/ViewProduct'
import CartPage from '../Components/CartPage/CartPage'
import CheckoutPage from '../Components/CheckoutPage/CheckoutPage'
const Routing = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/viewproduct/:id" element={<ViewProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Routing