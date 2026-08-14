import React, { useEffect } from "react";
import "./ViewCustomer.css";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const ViewCustomer = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [customer, setCustomer] = useState(null)

    useEffect(function () {
        function showCustomer() {
            let getCustomer = localStorage.getItem("Customers")
            let parseCustomers = JSON.parse(getCustomer)
            if (parseCustomers === null) {
                return
            } else {
                const findCustomer = parseCustomers.find(function (i) {
                    return i.id === Number(id)
                })
                if (findCustomer) {
                    setCustomer(findCustomer)
                }
                else{
                    navigate("/Customers")
                }
            }

        }
        showCustomer()
    }, [id])

     if (!customer) {
        return <div className="container "><h2 className="text-center my-5 bg-dark h-100">
            Loading Customers...</h2></div>;
    }

    return (
        <div className="view-customer-page">
            <div className="container-fluid">

                {/* Header */}
                <div className="view-customer-header">

                    <div>
                        <button onClick={function(){navigate("/Customers")}} className="customer-back-btn">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Customers
                        </button>

                        <h2 className="view-customer-title">
                            Customer Details
                        </h2>

                        <p className="view-customer-subtitle">
                            View complete information about this customer
                        </p>
                    </div>

                </div>


                {/* Customer Details Card */}
                <div className="view-customer-card">

                    <div className="row g-0">

                        {/* Customer Profile */}
                        <div className="col-12 col-lg-4">

                            <div className="customer-profile-section">

                                <div className="large-customer-avatar">
                                    {customer.name[0] + customer.name[customer.name.length - 1].toUpperCase()}
                                </div>

                                <h3 className="customer-profile-name">
                                    {customer.name}
                                </h3>

                                <span className={`${customer.status === "Active" ? "customer-profile-status" : "customer-inActiveProfile-status"}`}>
                                    <span className={`${customer.status === "Active" ? "status-dot" : "Inactivestatus-dot"}`}></span>
                                    {customer.status}
                                </span>

                                <p className="customer-profile-since">
                                    Customer {customer.customerSince}
                                </p>

                            </div>

                        </div>


                        {/* Customer Information */}
                        <div className="col-12 col-lg-8">

                            <div className="customer-information-section">

                                <h4 className="customer-section-title">
                                    Contact Information
                                </h4>


                                <div className="customer-info-grid">

                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Customer ID
                                        </span>

                                        <strong>
                                            #{customer.id}
                                        </strong>

                                    </div>


                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Full Name
                                        </span>

                                        <strong>
                                            {customer.name}
                                        </strong>

                                    </div>


                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Email
                                        </span>

                                        <strong>
                                            {customer.email}
                                        </strong>

                                    </div>


                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Phone
                                        </span>

                                        <strong>
                                            {customer.phone}
                                        </strong>

                                    </div>


                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Status
                                        </span>

                                        <strong className={`${customer.status === "Active" ? "customer-active-text" : "customer-inactive-text"}`} >
                                            {customer.status}
                                        </strong>

                                    </div>


                                    <div className="customer-info-item">

                                        <span className="customer-info-label">
                                            Customer Since
                                        </span>

                                        <strong>
                                            {customer.customerSince}
                                        </strong>

                                    </div>

                                </div>



                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ViewCustomer;

