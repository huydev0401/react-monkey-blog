import React from "react";

const DashboardHeading = ({ children, title = "", desc = "" }) => {
  return (
    <div className="mb-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="dashboard-heading">{title}</h1>
          <p className="dashboard-short-desc">{desc}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardHeading;
