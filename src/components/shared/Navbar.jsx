import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/auth/authSlice";
import { user } from "../../assets/getAssets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div className="bg-dark w-full px-2 py-2 text-white navbar">
      <div className="container-fluid w-full d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="toogleBtn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffCanvas"
            aria-controls="offcanvasExample"
          >
            <i className="fa-solid fa-bars text-white text-lg"></i>
          </button>

          <div className="pt-1 cursor-pointer" onClick={() => navigate("/")}>
            <h5>FinanceFlow</h5>
          </div>
        </div>
        <div
          className={`${
            auth?.email ? "block" : "d-none"
          } d-flex align-items-center gap-2 pe-3`}
        >
          <div className="dropdown">
            <button
              className="user-dropdown"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img className="user-imaage" src={user} alt="" />
            </button>
            <ul className="dropdown-menu me-5">
              <li>
                <div className="dropdown-item" href="#">
                  <p>{auth?.email}</p>
                </div>
              </li>
              <li>
                <div className="dropdown-item">
                  <button
                    onClick={() => dispatch(logOutUser())}
                    className="btn btn-danger w-full"
                  >
                    logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
