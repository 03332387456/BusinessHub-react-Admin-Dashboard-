import React from "react";
import "./Customers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customers = () => {

  const navigate = useNavigate();

  const [customer, setCustomer] = useState([])
  const [error, setError] = useState(null)
  const [Loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [status, setStatus] = useState("All")

  useEffect(function () {
    async function fetchcustomers() {
      try {
        let getCustomers = localStorage.getItem("Customers")
        if (getCustomers) {
          let parseCustomers = JSON.parse(getCustomers)
          setCustomer(parseCustomers)
        } else {
          let fetchData = await axios.get("./src/data/customers.json")
          console.log(fetchData.data)
          let data = fetchData.data
          localStorage.setItem("Customers", JSON.stringify(data))
          setCustomer(data)
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchcustomers()
  }, [])

  function handleSearchChange(e) {
    setSearchText(e.target.value)
  }

  function handleStatus(e) {
    setStatus(e.target.value)
    console.log(e.target.value)
  }

  const searchFilter = customer.filter(function (i) {
    return i.name.toLowerCase().includes(searchText.toLowerCase())
  })

  const statusFilter = searchFilter.filter(function (i) {
    if (status === "All") {
      return true
    } else {
      return i.status === status
    }
  })


  return (
    <div className="customers-page">
      <div className="container-fluid">

        {/* Page Header */}
        <div className="customers-header">
          <div>
            <h2 className="customers-title">
              Customers
            </h2>

            <p className="customers-subtitle">
              Manage your customers - All at single place
            </p>
          </div>
        </div>


        {/* Search + Filter */}
        <div className="customers-filters">

          <div className="customer-search-box">
            <i className="bi bi-search customer-search-icon"></i>

            <input
              type="search"
              name="search"
              value={searchText}
              onChange={handleSearchChange}
              className="form-control customer-search-input"
              style={{ "paddingLeft": "42px" }}
              placeholder="Search customers..."
            />
          </div>


          <select name="status" value={status} onChange={handleStatus} className="form-select customer-filter-select">
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>


        {/* Customers Table Card */}
        {/* Customers Content */}

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

          <div className="customers-table-card">

            <div className="table-responsive">

              <table className="table customers-table">

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Customer Since</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {statusFilter.map(function (i) {

                    return (
                      <tr key={i.id}>

                        <td>
                          <div className="customer-name-wrapper">

                            {/* Grabs the very last character of the customer's name by calculating the string's total length minus one.*/}
                            <div className="customer-avatar">
                              {i.name[0] + i.name[i.name.length - 1].toUpperCase()}
                            </div>


                            <span>
                              {i.name}
                            </span>

                          </div>
                        </td>

                        <td>
                          {i.email}
                        </td>

                        <td>
                          {i.phone}
                        </td>

                        <td>
                          <span className={`customer-status ${i.status === "Active" ? "status-active" : "status-inactive"}`}>
                            <span className="status-dot"></span>
                            {i.status}
                          </span>
                        </td>

                        <td>
                          {i.customerSince}
                        </td>

                        <td className="text-end">

                          <button onClick={() => navigate(`/Customers/${i.id}`)} className="customer-view-btn">
                            View
                          </button>

                        </td>

                      </tr>
                    );

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

export default Customers;