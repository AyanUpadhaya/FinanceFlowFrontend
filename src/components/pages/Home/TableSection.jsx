import { useRef, useState } from "react";
import FinanceTable from "../../tables/FinanceTable";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import SelecLimit from "../../ui/SelectLimit";
import { unparse } from "papaparse";
import {
  useBulkUploadTransactionsMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "../../../features/transaction/transactionApi";
import RequestLoader from "../../modals/RequestLoader";

import { ErrorNotify, InfoNotify } from "../../../utils/getNotify";

const TableSection = ({ data, user }) => {
  const [deleteTransaction, { isLoading: isDeleteRequesting }] =
    useDeleteTransactionMutation();

  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();
  const [
    bulkUploadTransactions,
    { isLoading: isBulkUploading, error: bulkuploadError },
  ] = useBulkUploadTransactionsMutation();

  const [isAscending, setIsAscending] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const uploadRef = useRef();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  //sort by timestamp
  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  //search filter

  const filterBySearch = (data, searchValue) => {
    if (searchValue.trim().length > 0) {
      return data?.trxName
        ?.toLowerCase()
        .startsWith(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  const filterByOptions = (data, searchTerm) => {
    if (searchTerm == "INCOME") {
      return data?.trxType == searchTerm;
    } else if (searchTerm == "EXPENSE") {
      return data?.trxType == searchTerm;
    } else {
      return true;
    }
  };

  const filteredData = data
    ? [...data]
        ?.sort(sortByTime)
        ?.filter((item) => filterBySearch(item, searchValue))
        ?.filter((item) => filterByOptions(item, searchTerm))
    : [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  function exportToCsv() {
    const desiredFields = [
      "_id",
      "trxName",
      "trxType",
      "trxAmount",
      "trxTag",
      "user",
    ];

    const filteredDataWwithDesiredFields = filteredData.map((item) => {
      let row = {};
      desiredFields.forEach((field) => {
        row[field] = item[field];
      });
      return row;
    });

    const csv = unparse(filteredDataWwithDesiredFields, {
      header: true,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const buklUploadHandler = ({
    event,
    ref,
    handler,
    infoMessage = "Transactions Uploaded successfully",
    errorMessage = "Something went wrong",
  }) => {
    const file = event.target.files[0];
    if (file?.name.includes("csv")) {
      const formData = new FormData();
      formData.append("file", file);
      handler({ formData })
        .unwrap()
        .then((res) => {
          InfoNotify(res?.message || infoMessage);
        })
        .catch((error) => {
          ErrorNotify(errorMessage || error?.data?.error?.message);
        });
      ref.current.value = "";
    } else {
      ref.current.value = "";
      ErrorNotify("Invalid Input");
      return;
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex gap-2 mb-3 align-items-center search-input">
          <div className="dropdown z-3">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </button>
            <ul className="dropdown-menu">
              <li
                className="cursor-pointer"
                onClick={() => setsearchTerm("all")}
              >
                <span className="dropdown-item cursor-pointer">All</span>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setsearchTerm("INCOME")}
              >
                <span className="dropdown-item cursor-pointer">INCOME</span>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setsearchTerm("EXPENSE")}
              >
                <span className="dropdown-item cursor-pointer">EXPENSE</span>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <input
              type="text"
              className="form-control w-full"
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-dark "
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => exportToCsv()}
          >
            Export to CSV
          </button>
          <label
            htmlFor="fileupload"
            className="btn btn-dark d-flex align-items-center gap-1"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span>Upload from CSV</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L11.65 8.35C11.85 8.15 12.16 8.15 12.36 8.35L17 13H14Z"
                  fill="white"
                />
              </svg>
            </span>
            <input
              type="file"
              id="fileupload"
              ref={uploadRef}
              accept=".csv"
              onChange={(event) =>
                buklUploadHandler({
                  event,
                  ref: uploadRef,
                  handler: bulkUploadTransactions,
                })
              }
              className="w-05 h-05 absolute opacity-0"
            />
          </label>
        </div>
      </div>
      <div className="table-container">
        <div className="table-section">
          <FinanceTable
            data={filteredData}
            indexOfFirstRow={indexOfFirstRow}
            indexOfLastRow={indexOfLastRow}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
            isUpdating={isUpdating}
            user={user}
          ></FinanceTable>
        </div>
        <div
          className={` ${
            filteredData < 1 && "d-none"
          } py-2 d-flex justify-content-center align-items-center gap-1`}
        >
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
            extraClassName="justify-content-end"
          />
          <div>
            <SelecLimit onChangeLimit={setRowsPerPage}></SelecLimit>
          </div>
        </div>
      </div>
      {(isDeleteRequesting || isUpdating || isBulkUploading) && (
        <RequestLoader></RequestLoader>
      )}
    </div>
  );
};

export default TableSection;
