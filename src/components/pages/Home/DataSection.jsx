import React from "react";
import DataCardsList from "../../cards/DataCardsList";
import AddIncomeModal from "../../modals/AddIncomeModal";
import AddExpenseModal from "../../modals/AddExpenseModal";
import { usePostTransactionMutation } from "../../../features/transaction/transactionApi";
import { useSelector } from "react-redux";
import RequestLoader from "../../modals/RequestLoader";

const DataSection = ({ extractedInfo }) => {
  const { auth } = useSelector((state) => state.auth);
  const [postTransaction, { isLoading, isSuccess, isError, error }] =
    usePostTransactionMutation();

  return (
    <>
      <div className="px-2 py-2 d-flex justify-content-between flex-wrap">
        <div>
          <h3 className="font-monts text-bold">Dashboard</h3>
        </div>
        <div className="d-flex gap-2">
          <button
            id="add-income"
            data-bs-toggle="modal"
            data-bs-target="#addIncomeModal"
            className="btn btn-dark font-monts"
          >
            Add Income
          </button>
          <button
            id="add-expense"
            data-bs-toggle="modal"
            data-bs-target="#addExpenseModal"
            className="btn btn-dark font-monts"
          >
            Add Expnese
          </button>
        </div>
      </div>
      <DataCardsList data={extractedInfo}></DataCardsList>
      <AddExpenseModal
        user={auth}
        createTransaction={postTransaction}
        isLoading={isLoading}
      ></AddExpenseModal>
      <AddIncomeModal
        user={auth}
        createTransaction={postTransaction}
        isLoading={isLoading}
      ></AddIncomeModal>
      {isLoading && <RequestLoader></RequestLoader>}
    </>
  );
};

export default DataSection;
