import React, { useState } from "react";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">

            <div className="navbar-left">

                <button
                    className="menu-button"
                    onClick={function () {
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <i className="bi bi-list"></i>
                </button>

                <h4>BusinessHub</h4>

            </div>


            <div className={`navbar-right ${menuOpen ? "show-menu" : ""}`}>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                    <i className="bi bi-search"></i>

                </div>


                <button className="nav-icon">
                    <i className="bi bi-bell"></i>
                </button>


                <button className="nav-icon">
                    <i className="bi bi-person-circle"></i>
                </button>

            </div>

        </nav>
    );
};

export default Navbar;