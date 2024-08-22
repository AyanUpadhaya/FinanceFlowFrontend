import React, { useState } from "react";
import { formatTimestamp } from "../../utils/formatTimeStamp";
import { InfoNotify, ErrorNotify } from "../../utils/getNotify";
import EditTransactionModal from "../modals/EditTransactionModal";
const FinanceTable = ({
  data,
  indexOfFirstRow,
  indexOfLastRow,
  currentPage,
  rowsPerPage,
  deleteTransaction,
  updateTransaction,
  isUpdating,
  user
}) => {
  const currentRows = data
    ? [...data].slice(indexOfFirstRow, indexOfLastRow)
    : [];

  const [selectedItem, setSelectedItem] = useState({});

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction({id,userId:user._id}).unwrap();
      InfoNotify("Transaction deleted");
    } catch (error) {
      ErrorNotify(error.message);
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Trx Name</th>
            <th scope="col">Trx Type</th>
            <th scope="col">Trx Amount</th>
            <th scope="col">Trx Tag</th>
            <th scope="col">Created</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.length == 0 ? (
            <tr>
              <td colSpan={8}>
                <h2 className="text-center font-monts">No data found</h2>
              </td>
            </tr>
          ) : (
            <>
              {currentRows?.map((item, index) => {
                return (
                  <tr key={item?._id}>
                    <td>
                      {currentPage === 1 && index + 1 < 10
                        ? "0" + (rowsPerPage * (currentPage - 1) + index + 1)
                        : rowsPerPage * (currentPage - 1) + index + 1}
                    </td>
                    <td>
                      {item?.trxName?.length > 30
                        ? item?.trxName.slice(0, 31) + "..."
                        : item?.trxName}
                    </td>
                    <td>{item?.trxType}</td>
                    <td>{item?.trxAmount + "$"}</td>
                    <td>{item?.trxTag}</td>
                    <td>{formatTimestamp(item?.timestamp)}</td>
                    <td className="d-flex justify-content-center gap-1">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#editIncomeModal"
                        onClick={() => setSelectedItem(item)}
                        className="btn btn-dark"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(item?._id)}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      <EditTransactionModal
        updateTransaction={updateTransaction}
        selectedItem={selectedItem}
        isUpdating={isUpdating}
        user={user}
      ></EditTransactionModal>
    </div>
  );
};

export default FinanceTable;
