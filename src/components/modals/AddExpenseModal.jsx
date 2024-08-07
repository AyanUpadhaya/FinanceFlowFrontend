import { useState } from "react";
import { InfoNotify } from "../../utils/getNotify";

const AddExpenseModal = ({ createTransaction, user, isLoading }) => {
  const [amount, setAmount] = useState(0);

  const handleChange = (value) => {
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  const handleTransaction = async (event) => {
    event.preventDefault();
    const form = event.target;
    const trxName = form.trxName.value;
    const trxTag = form.trxTag.value;
    const trxAmount = form.trxAmount.value;

    const data = {
      trxName,
      trxType: "EXPENSE",
      trxAmount: parseInt(trxAmount),
      trxTag,
      user: user?._id,
    };
    console.log(data);

    try {
      await createTransaction(data).unwrap();
      form.reset();
      setAmount(0);
      InfoNotify("Transactiion record created");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="modal fade"
      id="addExpenseModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addExpenseModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addExpenseModalLabel">
              Expense
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
                  required
                />
              </div>
              {/* tag */}
              <div className="mb-3">
                <label htmlFor="trxTag" className="form-label">
                  Trx Tag
                </label>
                <select required name="trxTag" className="form-select">
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Investment">Investment</option>
                  <option value="Health">Health</option>
                  <option value="Career">Career</option>
                  <option value="Others">Others</option>
                </select>
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
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
