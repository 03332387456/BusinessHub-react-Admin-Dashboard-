import React, { useEffect } from "react";
import "./ViewOrder.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const ViewOrder = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const [order, setorder] = useState(null)

    useEffect(function () {
        function showOrder() {
            let getOrder = localStorage.getItem("Orders")
            let parseOrder = JSON.parse(getOrder)
            if (parseOrder === null) {
                return
            } else {
                const findOrder = parseOrder.find(function (i) {
                    return i.id === Number(id)
                })
                if (findOrder) {
                    setorder(findOrder)
                } else {
                    navigate("/Orders")
                }
            }
        }
        showOrder()
    }, [id , navigate])

   
    if (!order) {
        return <div className="container ">
            <h2 className="text-center text-white my-5 bg-dark h-100">
                Loading Order...</h2>
        </div>;
    }


    return (
        <div className="view-order-page">
            <div className="container-fluid">

                {/* Page Header */}
                <div className="view-order-header">

                    <div>
                        <button onClick={function(){navigate("/Orders")}} className="order-back-btn">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Orders
                        </button>

                        <h2 className="view-order-title">
                            Order Details
                        </h2>

                        <p className="view-order-subtitle">
                            View complete information about this order
                        </p>
                    </div>

                    <span className="order-status-badge">
                        <span className="status-dot"></span>
                        {order.status}
                    </span>

                </div>


                {/* Order Summary */}
                <div className="order-summary-card">

                    <div className="row g-4">

                        <div className="col-12 col-md-4">
                            <div className="order-summary-item">

                                <span className="order-summary-label">
                                    Order ID
                                </span>

                                <strong className="order-summary-value">
                                    {order.id}
                                </strong>

                            </div>
                        </div>


                        <div className="col-12 col-md-4">
                            <div className="order-summary-item">

                                <span className="order-summary-label">
                                    Customer
                                </span>

                                <strong className="order-summary-value">
                                    {order.customerName}
                                </strong>

                            </div>
                        </div>


                        <div className="col-12 col-md-4">
                            <div className="order-summary-item">

                                <span className="order-summary-label">
                                    Order Date
                                </span>

                                <strong className="order-summary-value">
                                    {order.date}
                                </strong>

                            </div>
                        </div>

                    </div>

                </div>


                {/* Customer Information */}
                <div className="order-section-card">

                    <h4 className="order-section-title">
                        Customer Information
                    </h4>

                    <div className="customer-order-info">

                        <div className="customer-order-avatar">
                            {order.customerName[0].toUpperCase() + order.customerName[order.customerName.length - 1].toUpperCase()}
                        </div>

                        <div>
                            <h5 className="customer-order-name">
                                {order.customerName}
                            </h5>

                            <p className="customer-order-id">
                                Customer ID: #{order.customerId}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Ordered Products */}
                <div className="order-section-card">

                    <div className="order-section-header">

                        <h4 className="order-section-title mb-0">
                            Ordered Products
                        </h4>

                        <span className="order-items-count">
                            {order.products.length} Items
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table order-products-table">

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Product ID</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>

                                {order.products.map(function (i) {
                                    return <tr key={i.productId}> 

                                        <td>
                                            <div className="order-product-name">
                                                {i.title}
                                            </div>
                                        </td>

                                        <td>
                                            #{i.productId}
                                        </td>

                                        <td>
                                            {i.quantity}
                                        </td>

                                        <td>
                                            $ {i.price}
                                        </td>

                                        <td className="text-end">
                                            <strong>
                                                ${i.price * i.quantity}
                                            </strong>
                                        </td>

                                    </tr>
                                })}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* Order Total */}
                <div className="order-total-card">

                    <div className="order-total-row">

                        <span>
                            Total Items
                        </span>

                        <strong>
                            {order.products.quantity}
                        </strong>

                    </div>


                    <div className="order-total-divider"></div>


                    <div className="order-total-row order-grand-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ${order.total}
                        </strong>

                    </div>

                </div>


                {/* Actions */}
                <div className="order-actions">

                    <button onClick={function(){navigate("/Orders")}} className="btn btn-light order-cancel-btn">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Orders
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ViewOrder;

