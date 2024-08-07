import React from "react";
import "./Modals.css";
const RequestLoader = () => {
  return (
    <div className="custom-modal">
      <div className="custom-modal-body">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default RequestLoader;
