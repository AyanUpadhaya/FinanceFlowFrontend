import React from "react";
import Skeleton from "./Skeleton";

const CardsSkeletons = () => {
  return (
    <div className="pt-1">
      <div className="container-fluid py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        {Array(3)
          .fill()
          .map((item, index) => (
            <div key={index} className="w-full">
              <div className="card w-full shadow">
                <div className="card-body w-full py-3 d-flex flex-column gap-2 cal-card">
                  <h5 className="card-title">
                    <Skeleton classes={"title width-50"}></Skeleton>
                  </h5>
                  <h3 className="card-text">
                    <Skeleton classes={"title width-100"}></Skeleton>
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardsSkeletons;
