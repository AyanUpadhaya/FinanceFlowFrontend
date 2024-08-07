import React from "react";

const DataCardsList = ({data}) => {
  return (
    <div className="container-fluid py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <div className="w-full">
        <div className="card w-full shadow">
          <div className="card-body w-full py-3 d-flex flex-column gap-2 cal-card">
            <h5 className="card-title">Current Balance</h5>
            <h3 className="card-text">
              $ {data?.current_balance > 0 ? data?.current_balance : 0}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="card w-full shadow">
          <div className="card-body w-full py-3 d-flex flex-column gap-2 cal-card">
            <h5 className="card-title">Income</h5>
            <h3 className="card-text">
              $ {data?.total_income > 0 ? data?.total_income : 0}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="card w-full shadow">
          <div className="card-body w-full py-3 d-flex flex-column gap-2 cal-card">
            <h5 className="card-title">Expense</h5>
            <h3 className="card-text">
              $ {data?.total_expense > 0 ? data?.total_expense : 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCardsList;
