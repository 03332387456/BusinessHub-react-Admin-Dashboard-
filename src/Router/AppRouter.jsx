import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../Layouts/DashBoardLayout'
import Dashboard from '../Pages/DashBoard/Dashboard'
import Products from '../Pages/Products/Products'
import AddProduct from '../Pages/Products/AddProduct'
import ViewProduct from '../Pages/Products/ViewProduct'
import EditProduct from '../Pages/Products/EditProduct'
import Customers from '../Pages/Customers/Customers'
import ViewCustomer from '../Pages/Customers/ViewCustomer'
import Orders from '../Pages/Orders/Orders'
import ViewOrder from '../Pages/Orders/ViewOrder'
import NotFound from '../Pages/NotFound/NotFound'
import Settings from '../Pages/Settings/Settings'


const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='Products' element={<Products />} />
                    <Route path="Products/:id" element={<ViewProduct />} />
                    <Route path="Products/EditProducts/:id" element={<EditProduct />} />
                    <Route path="Products/AddProduct" element={<AddProduct />} />
                    <Route path="Customers" element={<Customers />} />
                    <Route path="Customers/:id" element={<ViewCustomer />} />
                    <Route path="Orders" element={<Orders />} />
                    <Route path="Settings" element={<Settings />} />
                    <Route path="Orders/:id" element={<ViewOrder />} />
                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter