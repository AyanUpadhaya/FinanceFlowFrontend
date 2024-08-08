import React from "react";
import { githublogo } from "../../assets/getAssets";

const OffCanvas = () => {
  return (
    <>
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="sidebarOffCanvas"
        aria-labelledby="sidebarOffCanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffCanvasLabel">
            Finance Tracker
          </h5>
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <a
              href="https://github.com/AyanUpadhaya/FinanceFlowFrontend"
              target="_blank"
              className="text-white text-decoration-none "
            >
              <button className="d-flex gap-2 align-items-center btn btn-light w-full rounded">
                <img src={githublogo} alt="" />
                <h3 className="text-dark pt-1">Github</h3>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvas;
