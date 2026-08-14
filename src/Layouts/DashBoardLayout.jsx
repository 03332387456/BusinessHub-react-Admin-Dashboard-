import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar.css";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(function (previousValue) {
      return !previousValue;
    });
  }

  return (
    <>
    
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <main
        className={`main-content ${isCollapsed ? "main-collapsed" : ""
          }`}
      >
        <div className="page-content">
          <Outlet />
        </div>

      </main>
    </>
  );
};

export default DashboardLayout;