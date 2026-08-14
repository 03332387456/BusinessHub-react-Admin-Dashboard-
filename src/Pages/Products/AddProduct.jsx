import React, { useEffect } from 'react'
import "./AddProduct.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {

  const navigate = useNavigate();
  const [productData, setProductData] = useState({ productName: "", category: "", price: "", image: "", description: "", status: "" })
  const [addProduct, setAddProduct] = useState([])

  function handelChange(e) {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
  }


  function addNewProduct(e) {

    e.preventDefault();

    let getProducts = localStorage.getItem("Products")
    let parseProducts = JSON.parse(getProducts)
    let lastId = parseProducts[parseProducts.length - 1]
    let createNewId = lastId.id + 1
    // console.log(createNewId)

    const newProduct = {
      id: Number(createNewId),
      ...productData
    }
    console.log(newProduct)
    const updatedLocalStorageProducts = [...parseProducts, newProduct]
    setAddProduct([
      ...addProduct,
      newProduct
    ])
    localStorage.setItem("Products", JSON.stringify(updatedLocalStorageProducts))
    toast('Product Added Successfully !', {
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
    }, 1500);
    setProductData({ title: "", category: "", price: "", image: "", description: "", status: "" })

  }

  return (
    <div className="add-product-page">

    <ToastContainer /> 

      <div className="container-fluid">

        {/* Page Header */}
        <div className="add-product-header">
          <div>
            <h2 className="add-product-title">Add Product</h2>
            <p className="add-product-subtitle">
              Add a new product to your inventory
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="add-product-card">

          <div>

            <div className="row g-4">

              {/* Product Name */}
              <div className="col-12">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  className="form-control product-input"
                  placeholder="Enter product name"
                  name='title'
                  value={productData.title}
                  onChange={handelChange}
                />
              </div>

              {/* Category */}
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Category
                </label>

                <select
                  name='category'
                  value={productData.category}
                  onChange={handelChange}
                  className="form-select product-input"
                >
                  <option value="">Select category</option>
                  <option value="Food" >Food</option>
                  <option value="Tech" >Tech</option>
                  <option value="Clothing" >Clothing</option>
                  <option value="Beverages" >Beverages</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Stationery">Stationery</option>
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
                    type="number"
                    className="form-control product-input"
                    placeholder="0.00"
                    name='price'
                    value={productData.price}
                    onChange={handelChange}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="col-12">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  name='image'
                  value={productData.image}
                  onChange={handelChange}
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
                  className="form-control product-input"
                  rows="5"
                  name='description'
                  placeholder="Enter product description"
                  value={productData.description}
                  onChange={handelChange}
                ></textarea>
              </div>

              {/* Status */}
              <div className="col-12 col-md-6">
                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  value={productData.status}
                  onChange={handelChange}
                  className="form-select product-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                onClick={addNewProduct}
                className="btn btn-primary save-product-btn"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Add Product
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct