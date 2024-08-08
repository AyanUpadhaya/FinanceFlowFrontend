import React, { useEffect, useState } from "react";
import { InfoNotify, ErrorNotify } from "../../utils/getNotify";
const EditTransactionModal = ({
  selectedItem,
  updateTransaction,
  isUpdating,
}) => {
  const [amount, setAmount] = useState(selectedItem?.trxAmount || 0);

  const handleChange = (value) => {
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setAmount(selectedItem?.trxAmount || 0);
    }
  }, [selectedItem]);

  const handleTransaction = async (event) => {
    event.preventDefault();

    const form = event.target;
    const trxName = form.trxName.value;
    const trxTag = form.trxTag.value;
    const trxAmount = form.trxAmount.value;

    if (!trxName || !trxTag || !trxAmount) {
      ErrorNotify("Required missing field");
      return;
    }

    if (parseInt(trxAmount) <= 0) {
      ErrorNotify("Amount can not be negative or zero");
      return;
    }

    if (
      trxName == selectedItem?.trxName &&
      trxTag == selectedItem?.trxTag &&
      trxAmount == selectedItem?.trxAmount
    ) {
      ErrorNotify("No changes made");
      return;
    }

    const id = selectedItem?._id;
    const data = {
      trxName,
      trxType: selectedItem?.trxType,
      trxAmount: parseInt(trxAmount, 10),
      trxTag,
      user: selectedItem?.user,
    };

    try {
      await updateTransaction({ data, id }).unwrap();
      form.reset();
      setAmount(0);
      InfoNotify("Transaction record updated");
    } catch (error) {
      ErrorNotify(error.message);
    }
  };
  return (
    <div
      className="modal fade"
      id="editIncomeModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editIncomeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editIncomeModalLabel">
              Edit Transaction
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleTransaction}>
              {/* name */}
              <div className="mb-3">
                <label htmlFor="trxName" className="form-label">
                  Trx Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="trxName"
                  name="trxName"
                  placeholder="Transactiion Name..."
                  defaultValue={selectedItem?.trxName}
                  required
                />
              </div>
              {/* tag */}
              <div className="mb-3">
                <label htmlFor="trxTag" className="form-label">
                  Trx Tag
                </label>
                {selectedItem?.trxType == "INCOME" && (
                  <select
                    defaultValue={selectedItem?.trxTag}
                    required
                    name="trxTag"
                    className="form-select"
                  >
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Job">Job</option>
                    <option value="Investment">Investment</option>
                    <option value="Rent">Rent</option>
                    <option value="Secret Source">Secret Source</option>
                  </select>
                )}
                {selectedItem?.trxType == "EXPENSE" && (
                  <select
                    defaultValue={selectedItem?.trxTag}
                    required
                    name="trxTag"
                    className="form-select"
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Investment">Investment</option>
                    <option value="Health">Health</option>
                    <option value="Career">Career</option>
                    <option value="Others">Others</option>
                  </select>
                )}
              </div>
              {/* amount */}
              <div className="mb-3">
                <label htmlFor="trxAmount" className="form-label">
                  Trx Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="trxAmount"
                  name="trxAmount"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => handleChange(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={isUpdating}
                  type="submit"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  {isUpdating ? "Updating.." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
