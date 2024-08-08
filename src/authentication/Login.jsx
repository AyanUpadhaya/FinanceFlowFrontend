import { useState, useEffect } from "react";
import { logo } from "../assets/getAssets";
import Navbar from "../components/shared/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/authApi";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { useSelector } from "react-redux";
import RequestLoader from "../components/modals/RequestLoader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, [auth]);
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login({ email, password }).unwrap();
      InfoNotify("User loggedin successfully");
      navigate(from, { replace: true });
    } catch (error) {
      ErrorNotify(error?.data?.message);
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
                    placeholder="Enter password..."
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
              <div>
                <button
                  disabled={isLoading}
                  className="btn btn-dark btn-lg w-100 text-md text-bold"
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              <br />
              <div>
                <Link to="/forgot-password">
                Forgot Password
                </Link>
                
              </div>
              <div>
                if you don&apos;t have account, please{" "}
                <Link to="/registration">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
    </div>
  );
};

export default Login;
