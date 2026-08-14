import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();

  const [Products, setProducts] = useState([])
  const [Loading, setLoading] = useState(true)
  const [error, seterror] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [categorey, setCategorey] = useState("All")
  const [sort, setSort] = useState("All")

  useEffect(function () {
    async function fetchProducts() {
      try {
        let getProducts = localStorage.getItem("Products")
        let ParseProducts = JSON.parse(getProducts)
        if (ParseProducts) {
          setProducts(ParseProducts)
        } else {
          let response = await axios.get("./src/data/Products.json")
          let data = response.data
          localStorage.setItem("Products", JSON.stringify(data))
          setProducts(data)
          console.log(Products)
        }
      } catch (error) {
        console.log(error)
        seterror(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])


  function handelSearchText(e) {
    setSearchText(e.target.value)
  }

  function handelCategorey(e) {
    console.log(e.target.value)
    setCategorey(e.target.value)
  }

  function handelSort(e) {
    console.log(e.target.value)
    setSort(e.target.value)
  }

  const filterSearch = Products.filter(function (i) {
    return i.title.toLowerCase().includes(searchText.toLowerCase())
  })

  const categoreyFilter = filterSearch.filter(function (item) {
    if (categorey === "All") {
      return true
    } else {
      return item.category === categorey
    }
  })

  const sortedProducts = [...categoreyFilter];
  const sortFilter = sortedProducts.sort(function (a, b) {
    if (sort === "Low To High") {
      return a.price - b.price
    } else if (sort === "High to Low") {
      return b.price - a.price
    } else if (sort === "A-Z") {
      return a.title.localeCompare(b.title)
    } else if (sort === "Z-A") {
      return b.title.localeCompare(a.title)
    } else {
      return sort === "All"
    }

  })

  if (Loading) {
    <h1>Loading Products ... </h1>
  }
  if (error) {
    <h1>Some Error Occur...</h1>
  }

  return (
    <div className="products-page">

      {/* Page Header */}
      <div className="products-header">

        <div>
          <h2 className="products-title">
            Products
          </h2>

          <p className="products-subtitle">
            Manage your products
          </p>
        </div>

        <button onClick={() => navigate("/Products/AddProduct")} className="btn btn-primary add-product-btn">
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>

      </div>


      {/* Search + Filters */}
      <div className="products-filters">

        <div className="search-box">
          <i className="bi bi-search search-icon"></i>

          <input
            name="Search Text"
            value={searchText}
            onChange={handelSearchText}
            type="search"
            className="form-control search-input"
            placeholder="Search products..."
          />
        </div>


        <select name="Categories" value={categorey} onChange={handelCategorey} className="form-select filter-select">
          <option value="All" >All Categories</option>
          <option value="Food" >Food</option>
          <option value="Tech" >Tech</option>
          <option value="Clothing" >Clothing</option>
          <option value="Beverages" >Beverages</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
          <option value="Stationery">Stationery</option>
          Stationery
          
        </select>


        <select name="sortings" value={sort} onChange={handelSort} className="form-select filter-select">
          <option value="All">Sort By</option>
          <option value="A-Z">Name: A-Z</option>
          <option value="Z-A">Name: Z-A</option>
          <option value="Low To High">Price: Low to High</option>
          <option value="High to Low">Price: High to Low</option>
        </select>

      </div>


      {/* Products */}
      <div className="row g-3 g-lg-4">

        {/* Product 1 */}
        {sortFilter.map(function (item) {
          return <div key={item.id} className="col-12 col-md-6 col-lg-3">

            <div className="product-card">

              <div className="product-image-wrapper">

                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                />

                <span className={item.status === "Active" ? "product-status" : "product-status-InActive"}>
                  {item.status}
                </span>

              </div>


              <div className="product-card-body">

                <span className="product-category">
                  {item.category}
                </span>

                <h5 className="product-name">
                  {item.title}
                </h5>

                <p className="product-description">
                  {item.description}
                </p>


                <div className="product-footer">

                  <strong className="product-price">
                    ${item.price}
                  </strong>

                  <button onClick={() => navigate(`/Products/${item.id}`)} className="view-product-btn">
                    View
                  </button>

                </div>

              </div>

            </div>

          </div>
        })}

      </div>

    </div>
  );
};

export default Products;