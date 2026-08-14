import React, { useEffect } from "react";
import "./ViewProduct.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [showProduct, setShowProduct] = useState(null)

    useEffect(function () {
        function getProductToShow() {

            let getProduct = localStorage.getItem("Products")
            let parseProduct = JSON.parse(getProduct)
            if (parseProduct === null) {
                return
            } else {
                const findProduct = parseProduct.find(function (item) {
                    return item.id === Number(id)
                })
                if (findProduct) {
                    setShowProduct(findProduct)
                } else {
                    navigate("/Products")
                }
            }

        }
        getProductToShow()
    }, [id])

    function deleteProduct(id) {
        console.log(id)
        let getProduct = localStorage.getItem("Products")
        let parseProduct = JSON.parse(getProduct)
        let filterDelete = parseProduct.filter(function (item) {
            return item.id !== id
        })
        let updatedArray = JSON.stringify(filterDelete)
        localStorage.setItem("Products", updatedArray)
        toast('Product Deleted Successfully !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
        setTimeout(() => {
            navigate("/Products");
        }, 2000);
    }

   


    return (


        <div className="view-product-page">
            <ToastContainer />
            <div className="container-fluid">

                {/* Header */}
                <div className="view-product-header">

                    <div>
                        <button className="back-btn" onClick={() => navigate("/Products")}>
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Products
                        </button>

                        <h2 className="view-product-title">
                            Product Details
                        </h2>

                        <p className="view-product-subtitle">
                            View complete information about this product
                        </p>
                    </div>

                </div>


                {/* Product Card */}
                <div className="product-details-card">

                    {showProduct ? (
                        <div className="row g-0">

                            {/* Product Image */}
                            <div className="col-12 col-lg-5">

                                <div className="product-details-image-wrapper">

                                    <img
                                        src={showProduct.image}
                                        alt={showProduct.title}
                                        className="product-details-image"
                                    />

                                </div>

                            </div>


                            {/* Product Information */}
                            <div className="col-12 col-lg-7">

                                <div className="product-details-content">

                                    <div className="product-details-top">

                                        <span className="product-details-category">
                                            {showProduct.category}
                                        </span>

                                        <span className="product-details-status">
                                            {showProduct.status}
                                        </span>

                                    </div>


                                    <h1 className="product-details-name">
                                        {showProduct.title}
                                    </h1>


                                    <div className="product-details-price">
                                        ${showProduct.price}
                                    </div>


                                    <div className="product-details-divider"></div>


                                    {/* Information */}
                                    <div className="product-info-grid">

                                        <div className="product-info-item">
                                            <span className="product-info-label">
                                                Product ID
                                            </span>

                                            <strong>
                                                #{showProduct.id}
                                            </strong>
                                        </div>


                                        <div className="product-info-item">
                                            <span className="product-info-label">
                                                Category
                                            </span>

                                            <strong>
                                                {showProduct.category}
                                            </strong>
                                        </div>


                                        <div className="product-info-item">
                                            <span className="product-info-label">
                                                Status
                                            </span>

                                            <strong className="status-active">
                                                {showProduct.status}
                                            </strong>
                                        </div>


                                        <div className="product-info-item">
                                            <span className="product-info-label">
                                                Price
                                            </span>

                                            <strong>
                                                ${showProduct.price}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="product-details-divider"></div>


                                    {/* Description */}
                                    <div className="product-description-section">

                                        <h5>
                                            Description
                                        </h5>

                                        <p>
                                            {showProduct.description}
                                        </p>

                                    </div>


                                    {/* Actions */}
                                    <div className="product-details-actions">

                                        <button onClick={() => navigate(`/Products/EditProducts/${showProduct.id}`)} className="btn btn-outline-primary edit-btn">
                                            <i className="bi bi-pencil me-2"></i>
                                            Edit Product
                                        </button>

                                        <button onClick={function () { deleteProduct(showProduct.id) }} className="btn btn-danger delete-btn">
                                            <i className="bi bi-trash me-2"></i>
                                            Delete Product
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ) : <h2>Loading Product</h2>}


                </div>

            </div>
        </div>
    );
};

export default ViewProduct;