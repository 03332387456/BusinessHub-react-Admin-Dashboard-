import React from "react";
import "./Settings.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate();

  const [Profile, setProfile] = useState({
    name: "", email: "", imageUrl: ""
  })

  function handelProfile(e) {

    setProfile({
      ...Profile,
      [e.target.name]: e.target.value

    })
    console.log(e.target.value)
    console.log(e.target.name)
  }

  function UpdateSettings() {
    localStorage.setItem("Settings", JSON.stringify(Profile))
    toast('Profile Updates Successfully !', {
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
      navigate("/");
    }, 1500);
  }

  return (
    <div className="settings-page">
      <div className="container-fluid">
        <ToastContainer />

        {/* Page Header */}
        <div className="settings-header">
          <h2 className="settings-title">
            Settings
          </h2>

          <p className="settings-subtitle">
            Manage your account and preferences.
          </p>
        </div>


        {/* Profile Section */}
        <div className="settings-section">

          <h4 className="settings-section-title">
            Profile
          </h4>

          <div className="settings-card">

            <form>

              {/* Name */}
              <div className="settings-form-group">

                <label className="settings-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={Profile.name}
                  onChange={handelProfile}
                  className="form-control settings-input"
                  placeholder="Enter Name "

                />

              </div>


              {/* Email */}
              <div className="settings-form-group">

                <label className="settings-label">
                  Email
                </label>

                <input
                  name="email"
                  value={Profile.email}
                  onChange={handelProfile}
                  type="email"
                  className="form-control settings-input"
                  placeholder="Enter your Email"

                />

              </div>



              <div className="settings-form-group">

                <label className="settings-label">
                  Image
                </label>

                <input
                  name="imageUrl"
                  value={Profile.imageUrl}
                  onChange={handelProfile}
                  className="form-control settings-input"
                  placeholder="enter Image Url"

                />

              </div>


              {/* Save */}
              <div className="settings-actions">
                <div className="row align-items-center g-3">

                  <div className="col-12 col-md-8">
                    <p className="text-muted mb-0">
                      <i class="bi bi-universal-access-circle"></i> After saving changes, reload the main page to see your updated profile.
                    </p>
                  </div>

                  <div className="col-12 col-md-4 text-md-end">
                    <button
                      onClick={UpdateSettings}
                      type="button"
                      className="btn btn-primary settings-save-btn"
                    >
                      Save Changes
                    </button>
                  </div>

                </div>
              </div>

            </form>

          </div>

        </div>


        {/* Preferences Section */}
        <div className="settings-section">

          <h4 className="settings-section-title">
            Preferences
          </h4>

          <div className="settings-card">

            {/* Email Notifications */}
            <div className="settings-option">

              <div>
                <h6 className="settings-option-title">
                  Email Notifications
                </h6>

                <p className="settings-option-description">
                  Receive notifications through email.
                </p>
              </div>

              <div className="form-check form-switch">

                <input
                  className="form-check-input settings-switch"
                  type="checkbox"
                  defaultChecked
                />

              </div>

            </div>


            {/* Order Notifications */}
            <div className="settings-option">

              <div>
                <h6 className="settings-option-title">
                  Order Notifications
                </h6>

                <p className="settings-option-description">
                  Receive notifications about orders.
                </p>
              </div>

              <div className="form-check form-switch">

                <input
                  className="form-check-input settings-switch"
                  type="checkbox"
                  defaultChecked
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
