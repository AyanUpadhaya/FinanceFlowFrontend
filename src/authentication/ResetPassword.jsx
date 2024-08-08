import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { useResetPasswordMutation } from "../features/api/authApi";
import Navbar from "../components/shared/Navbar";
import RequestLoader from "../components/modals/RequestLoader";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;
  let from = "/login";
  let tokenId = searchParams.get("token");

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (password !== confirmPassword) {
      ErrorNotify("Passwords did not match.");
      return;
    }
    const data = { password };
    try {
      await resetPassword({ data, tokenId }).unwrap();
        InfoNotify("Password changed successfully");
        navigate(from, { replace: true });
    } catch (error) {
      ErrorNotify(error?.data?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="py-5 d-flex justify-content-center align-items-center">
        <div className="px-2 w-100 py-5">
          <div className="mx-auto login-form">
            <form className="w-100" onSubmit={handleSubmit}>
              {/* password */}
              <div>
                <label className="text-bold font-monts text-md" htmlFor="">
                  Password
                </label>
                <br />
                <div className="password-box">
                  <input
                    required
                    className="form-control text-lg"
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />

                  <button
                    className="show-btn"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {!showPassword ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
              <br />
              {/* confirm password */}
              <div>
                <label className="text-bold font-monts text-md" htmlFor="">
                  Confirm password
                </label>
                <br />
                <div className="password-box">
                  <input
                    required
                    className="form-control text-lg"
                    type={!showConfirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />

                  <button
                    className="show-btn"
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {!showConfirmPassword ? (
                      <i className="fa-solid fa-eye"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash"></i>
                    )}
                  </button>
                </div>
              </div>
              <br />

              <div>
                <button
                  disabled={isLoading}
                  className="btn btn-dark btn-lg w-100 text-md text-bold"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Reset Password"}
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
    </div>
  );
};

export default ResetPassword;
