import React from "react";
import SplineChart from "../../chats/SplineChart";
import PieChart from "../../chats/PieChart";

const ChartSection = ({ data }) => {
  const processTransactionIncomeData = (transactions) => {
    const incomeData = transactions
      .filter((trx) => trx.trxType === "INCOME")
      .reduce((acc, trx) => {
        const date = new Date(trx.createdAt);
        const month = date.getMonth();
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = { date: new Date(year, month), amount: 0 };
        }
        acc[key].amount += trx.trxAmount;

        return acc;
      }, {});

    return Object.values(incomeData).sort((a, b) => a.date - b.date);
  };

  const processExpenseData = (transactions) => {
    const expenseData = transactions
      .filter((trx) => trx.trxType === "EXPENSE")
      .reduce((acc, trx) => {
        if (!acc[trx.trxTag]) {
          acc[trx.trxTag] = 0;
        }
        acc[trx.trxTag] += trx.trxAmount;
        return acc;
      }, {});

    const totalExpense = Object.values(expenseData).reduce(
      (acc, amount) => acc + amount,
      0
    );

    return Object.entries(expenseData).map(([label, amount]) => ({
      label,
      y: ((amount / totalExpense) * 100).toFixed(2),
    }));
  };


  const incomeDataPoints = data ? processTransactionIncomeData(data) : [];
  const expenseDataPoints = data ? processExpenseData(data) : [];
  return (
    <>
      <div className="py-4 container-fluid">
        <h3>Finance - 2024</h3>
        <div className="row gap-0">
          <div className="col-12 col-md-8 rounded px-3 mb-3">
            <SplineChart incomeDataPoints={incomeDataPoints}></SplineChart>
          </div>
          <div className="col-12 col-md-4 rounded px-3">
            <PieChart expenseDataPoints={expenseDataPoints}></PieChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartSection;
