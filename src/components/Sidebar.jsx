import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const SideBar = ({ isCollapsed, toggleSidebar }) => {

    const [profile, setProfile] = useState(null)
    const [error, seterror] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(function () {
        try {
            let getUserData = localStorage.getItem("Settings")
            let parseData = JSON.parse(getUserData)
            if (getUserData) {
                setProfile(parseData)
            }
        } catch (error) {
            seterror(error)
        }finally{
            setLoading(false)
        }
    }, [])

  

    if (Loading) {
        return <h2>Loading ... </h2>
    }

    if (error) {
        return <h2>An error Occur while Loading Profile  </h2>
    }

    return (
        <nav
            className={`sidebar ${isCollapsed ? "collapsed" : ""
                } d-flex flex-column flex-shrink-0 position-fixed`}
        >

            <button
                className="toggle-btn"
                onClick={toggleSidebar}
            >
                <i
                    className={`fas ${isCollapsed
                        ? "bi bi-chevron-right"
                        : "bi bi-chevron-right"
                        }`}
                ></i>
            </button>


            <div className="p-4">

                <h4 className="logo-text fw-bold mb-0">

                    {!isCollapsed
                        ? "BusinessHub"
                        : "B-H"
                    }

                </h4>

                <p className="text-muted small hide-on-collapse">
                    Dashboard
                </p>

            </div>


            <div className="nav flex-column">

                <NavLink to="/"
                    className="sidebar-link active text-decoration-none p-3"
                >
                    <i className="bi bi-speedometer me-3"></i>

                    <span className="hide-on-collapse">
                        Dashboard
                    </span>
                </NavLink>


                <NavLink to="/Orders"
                    className="sidebar-link text-decoration-none p-3"
                >
                    <i className="bi bi-card-checklist me-3"></i>

                    <span className="hide-on-collapse">
                        Orders
                    </span>
                </NavLink>


                <NavLink to="/Customers"
                    className="sidebar-link text-decoration-none p-3"
                >
                    <i className="bi bi-people me-3"></i>

                    <span className="hide-on-collapse">
                        Customers
                    </span>
                </NavLink>


                <NavLink to="/Products"
                    className="sidebar-link text-decoration-none p-3"
                >
                    <i className="bi bi-box me-3"></i>

                    <span className="hide-on-collapse">
                        Products
                    </span>
                </NavLink>


                <NavLink to="/Settings"
                    className="sidebar-link text-decoration-none p-3"
                >
                    <i className="bi bi-gear-fill me-3"></i>

                    <span className="hide-on-collapse">
                        Settings
                    </span>
                </NavLink>

            </div>


            <div className="profile-section mt-auto p-4">

                <div className="d-flex align-items-center">

                    <img
                        src={
                            profile
                                ? profile.imageUrl
                                : "https://i.pinimg.com/736x/24/bd/ee/24bdeecd546a2c6b7e34857a104afe68.jpg"
                        }
                        style={{ height: "60px"}}
                        className="rounded-circle"
                        alt="Profile"
                    />

                    <div className="ms-3 profile-info">
                        <h6 className="text-white mb-0">
                            {profile ? profile.name : "Your Name"}
                        </h6>


                        <small className="text-white">
                            Admin
                        </small>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default SideBar;