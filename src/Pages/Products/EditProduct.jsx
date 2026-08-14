import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./EditProduct.css"

const EditProduct = () => {

    const [product, setProduct] = useState({
        id: null,
        title: "",
        category: "",
        price: "",
        image: "",
        description: "",
        status: "Active"
    });
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(function () {
        let getProduct = localStorage.getItem("Products")
        let parseProducts = JSON.parse(getProduct)
        console.log(parseProducts)
        let findProduct = parseProducts.find(function (item) {
            return item.id === Number(id)
        })
        if (findProduct) {
            setProduct(findProduct);
        } else {
            navigate("/Products");
        }
    }, [id])



    function handelChange(e) {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    function updateProduct(e) {
        e.preventDefault();

        let getProducts = localStorage.getItem("Products");
        let parseProducts = JSON.parse(getProducts);

        let updatedProducts = parseProducts.map(function (item) {

            if (item.id === Number(id)) {
                return product;
            }

            return item;
        });

        localStorage.setItem(
            "Products",
            JSON.stringify(updatedProducts)
        );

        toast('Product Added Successfully !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(function () {
            navigate("/Products");
        }, 1000);
    }






    return (
        <div className="edit-product-page">
            <ToastContainer />
            <div className="container-fluid">

                {/* Page Header */}
                <div className="edit-product-header">

                    <div>
                        <h2 className="edit-product-title">
                            Edit Product
                        </h2>

                        <p className="edit-product-subtitle">
                            Update your product information
                        </p>
                    </div>

                </div>


                {/* Form Card */}
                <div className="edit-product-card">

                    <form>

                        <div className="row g-4">

                            {/* Product Name */}
                            <div className="col-12">

                                <label className="form-label">
                                    Product Name
                                </label>

                                <input
                                    value={product.title}
                                    onChange={handelChange}
                                    name='title'
                                    type="text"
                                    className="form-control product-input"
                                    placeholder="Enter product name"
                                />

                            </div>


                            {/* Category */}
                            <div className="col-12 col-md-6">

                                <label className="form-label">
                                    category
                                </label>

                                <select name="category" value={product.category}
                                    onChange={handelChange}
                                    className="form-select product-input"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Food">
                                        Food
                                    </option>

                                    <option value="Tech">
                                        Tech
                                    </option>

                                    <option value="Clothing">
                                        Clothing
                                    </option>

                                    <option value="Beverages">
                                        Beverages
                                    </option>

                                    <option value="Accessories">
                                        Accessories
                                    </option>

                                </select>

                            </div>


                            {/* Price */}
                            <div className="col-12 col-md-6">

                                <label className="form-label">
                                    Price
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text price-prefix">
                                        $
                                    </span>

                                    <input
                                        value={product.price}
                                        onChange={handelChange}
                                        name='price'
                                        type="number"
                                        className="form-control product-input"
                                        placeholder="0.00"
                                    />

                                </div>

                            </div>


                            {/* Image URL */}
                            <div className="col-12">

                                <label className="form-label">
                                    Image URL
                                </label>

                                <input
                                    value={product.image}
                                    onChange={handelChange}
                                    name='image'
                                    type="text"
                                    className="form-control product-input"
                                    placeholder="https://example.com/image.jpg"
                                />


                            </div>


                            {/* Description */}
                            <div className="col-12">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    value={product.description}
                                    onChange={handelChange}
                                    name='description'
                                    className="form-control product-input"
                                    rows="5"
                                    placeholder="Enter product description"
                                ></textarea>

                            </div>


                            {/* Status */}
                            <div className="col-12 col-md-6">

                                <label className="form-label">
                                    Status
                                </label>

                                <select name="status"
                                    value={product.status}
                                    onChange={handelChange}
                                    className="form-select product-input"
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* Form Actions */}
                        <div className="form-actions">

                            <button
                                type="button"
                                className="btn btn-light cancel-btn"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={updateProduct}
                                className="btn btn-primary update-product-btn"
                            >
                                <i className="bi bi-check-lg me-2"></i>
                                Update Product
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default EditProduct