import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="not-found-page">

      <div className="container">

        <div className="not-found-content text-center">

          <div className="not-found-icon">
            <i className="bi bi-compass"></i>
          </div>

          <div className="not-found-code">
            404
          </div>

          <h1 className="not-found-title">
            Page Not Found
          </h1>

          <p className="not-found-description">
            Sorry, the page you're looking for doesn't exist or may have
            been moved to another location.
          </p>

          <div className="not-found-actions">

            <button
              onClick={() => navigate("/")}
              className="btn btn-primary not-found-home-btn"
            >
              <i className="bi bi-house me-2"></i>
              Back to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="btn btn-light not-found-back-btn"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default NotFound;

