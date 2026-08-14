import React from "react";
import "./Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Orders = () => {

  const navigate = useNavigate()

  const [order, setOrder] = useState([])
  const [error, setErro] = useState(null)
  const [Loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [status, setStatus] = useState("All")

  useEffect(function () {
    async function showOrders() {
      try {
        let getOrders = localStorage.getItem("Orders")
        let parseOrders = JSON.parse(getOrders)

        if (Array.isArray(parseOrders)) {

          setOrder(parseOrders)

        } else {

          let api = await axios.get("/data/orders.json")
          let data = api.data

          localStorage.setItem("Orders", JSON.stringify(data))
          setOrder(data)
        }
      } catch (error) {
        console.log(error)
        setErro(error)
      } finally {
        setLoading(false)
      }
    }
    showOrders()
  }, [])

  function handelsearch(e) {
    setSearchText(e.target.value)
  }
  function handelStatus(e) {
    setStatus(e.target.value)
  }

  const searchFilter = order.filter(function (i) {
    return i.customerName.toLowerCase().includes(searchText.toLowerCase())
  })

  const statusFilter = searchFilter.filter(function (i) {
    if (status === "All") {
      return true
    } else {
      return i.status === status
    }
  })


  return (
    <div className="orders-page">
      <div className="container-fluid">

        {/* Page Header */}
        <div className="orders-header">
          <div>
            <h2 className="orders-title">
              Orders
            </h2>

            <p className="orders-subtitle">
              Manage customer orders
            </p>
          </div>
        </div>


        {/* Search + Filters */}
        <div className="orders-filters">

          <div className="order-search-box">
            <i className="bi bi-search order-search-icon"></i>

            <input
              value={searchText}
              name="Search"
              onChange={handelsearch}
              type="search"
              style={{ "paddingLeft": "42px" }}
              className="form-control order-search-input"
              placeholder="Search orders..."
            />
          </div>


          <select value={status} onChange={handelStatus} name="status" className="form-select order-filter-select">

            <option value="All">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>


          </select>

        </div>

        {Loading ? (

          <div className="customers-state-card">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <h5>Loading customers...</h5>

            <p>
              Please wait while we load your customer data.
            </p>
          </div>

        ) : error ? (

          <div className="customers-error-card">
            <div className="error-icon">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>

            <h5>Unable to load customers</h5>

            <p>
              Something went wrong while loading the customer data.
              Please try again.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Try Again
            </button>
          </div>

        ) : (

          <div className="orders-table-card">

            <div className="table-responsive">

              <table className="table orders-table">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>


                <tbody>

                  {/* Order 1 */}
                  {statusFilter.map(function (i) {
                    return <tr key={i.id}>
                      <td >
                        <strong className="order-number">
                          #{i.id}
                        </strong>
                      </td>

                      <td>
                        <div className="order-customer-wrapper">

                          <div className="order-customer-avatar">
                            {i.customerName[0].toUpperCase() + i.customerName[i.customerName.length - 1].toUpperCase()}
                          </div>

                          <span>
                            {i.customerName}
                          </span>

                        </div>
                      </td>

                      <td>
                        {i.date}
                      </td>

                      <td>
                        {i.products.length} items
                      </td>

                      <td>
                        <strong className="order-total">
                          ${i.total}
                        </strong>
                      </td>

                      <td>
                        <span className={`${i.status === "Paid" ? "order-status status-paid" : "order-status status-pending"}`}>
                          <span className={`${i.status === "Paid" ? "status-paid status-dot" : "status-pending status-dot"}`}></span>
                          {i.status}
                        </span>
                      </td>

                      <td className="text-end">
                        <button onClick={function () { navigate(`/Orders/${i.id}`) }} className="order-view-btn">
                          View
                        </button>
                      </td>
                    </tr>
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;

