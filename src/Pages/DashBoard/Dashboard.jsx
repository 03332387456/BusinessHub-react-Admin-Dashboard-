import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate} from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const getProducts = localStorage.getItem("Products")
      const getOrders = localStorage.getItem("Orders")
      const getCustomers = localStorage.getItem("Customers")

      if (getProducts) {
        setProducts(JSON.parse(getProducts))
      }

      if (getOrders) {
        setOrders(JSON.parse(getOrders))
      }

      if (getCustomers) {
        setCustomers(JSON.parse(getCustomers))
      }

    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const newArrayOfOrder =  orders.slice(0,4)

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  if (error) {
    return <div>Something went wrong.</div>
  }

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="dashboard-header mb-4">
        <h2 className="dashboard-title">
          Dashboard
        </h2>

        <p className="dashboard-subtitle">
          Good morning, Ahsan. Here's what's happening with your business.
        </p>
      </div>


      {/* Statistics Cards */}
      <div className="row g-4 mb-4">

        {/* Products */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="dashboard-card stat-card h-100">

            <div className="stat-card-content">
              <div>
                <p className="stat-label">
                  Products
                </p>

                <h3 className="stat-value">
                  {products.length}
                </h3>

                <p className="stat-description">
                  Total products
                </p>
              </div>

              <div className="stat-icon stat-icon-blue">
                <i className="bi bi-box-seam"></i>
              </div>
            </div>

          </div>
        </div>


        {/* Customers */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="dashboard-card stat-card h-100">

            <div className="stat-card-content">
              <div>
                <p className="stat-label">
                  Customers
                </p>

                <h3 className="stat-value">
                  {customers.length}
                </h3>

                <p className="stat-description">
                  Active customers
                </p>
              </div>

              <div className="stat-icon stat-icon-green">
                <i className="bi bi-people"></i>
              </div>
            </div>

          </div>
        </div>


        {/* Orders */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="dashboard-card stat-card h-100">

            <div className="stat-card-content">
              <div>
                <p className="stat-label">
                  Orders
                </p>

                <h3 className="stat-value">
                  {orders.length}
                </h3>

                <p className="stat-description">
                  Total orders
                </p>
              </div>

              <div className="stat-icon stat-icon-orange">
                <i className="bi bi-cart3"></i>
              </div>
            </div>

          </div>
        </div>

      </div>


      {/* Recent Orders */}
      <div className="dashboard-card">

        <div className="card-header-custom">
          <div>
            <h5 className="card-title-custom">
              Recent Orders
            </h5>

            <p className="card-subtitle-custom">
              Latest activity from your customers
            </p>
          </div>

          <button onClick={function(){navigate("/Orders")}} className="btn btn-primary dashboard-view-btn">
            View All
          </button>
        </div>


        <div className="table-responsive">

          <table className="table dashboard-table align-middle mb-0">

            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

             {newArrayOfOrder.map(function(i){
               return <tr key={i.id}>
                <td>
                  <strong>#{i.id}</strong>
                </td>

                <td>
                  {i.customerName}
                </td>

                <td>
                  ${i.total}
                </td>

                <td>
                  <span className="status-badge status-completed">
                    {i.status}
                  </span>
                </td>

                <td>
                  {i.date}
                </td>
              </tr>
             })}


              
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;