import { useState, useEffect } from "react";
import { logo } from "../assets/getAssets";
import Navbar from "../components/shared/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/api/authApi";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { useSelector } from "react-redux";
import RequestLoader from "../components/modals/RequestLoader";

const ForgotPasword = () => {
  const [forgotPassword, { isLoading, isError, error }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);

  let from = "/login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    try {
      await forgotPassword({ email }).unwrap();
      InfoNotify("Mail has been sent");
      navigate(from, { replace: true });
    } catch (error) {
        ErrorNotify(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="py-5 d-flex justify-content-center align-items-center">
        <div className="px-2 w-100">
          <div className="d-flex justify-content-center  ">
            <img className="logo" src={logo} alt="" />
          </div>
          <div className="mx-auto login-form">
            <form className="w-100" onSubmit={handleSubmit}>
              <div>
                <label className="text-bold font-monts text-md" htmlFor="">
                  Email
                </label>
                <br />
                <input
                  required
                  className="form-control text-lg"
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                />
              </div>
              <br />

              <div>
                <button
                  disabled={isLoading}
                  className="btn btn-dark btn-lg w-100 text-md text-bold"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Send Request"}
                </button>
              </div>
              <br />
              <div>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
    </div>
  );
};

export default ForgotPasword;
