import { useState, useEffect } from "react";
import { logo } from "../assets/getAssets";
import Navbar from "../components/shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { useRegisterMutation } from "../features/api/authApi";
import RequestLoader from "../components/modals/RequestLoader";

const Registration = () => {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth?.email) {
      navigate("/");
    }
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await register({ name, email, password }).unwrap();
      InfoNotify("User registered successfully");
      navigate("/login");
    } catch (error) {
      ErrorNotify(error?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-5 d-flex justify-content-center align-items-center">
        <div className="px-2 w-100">
          <div className="d-flex justify-content-center">
            <img className="logo" src={logo} alt="" />
          </div>
          <div className="mx-auto login-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-bold font-monts text-md" htmlFor="name">
                  Name
                </label>
                <br />
                <input
                  required
                  className="form-control text-lg"
                  type="text"
                  name="name"
                  placeholder="Name..."
                />
              </div>
              <br />
              <div>
                <label className="text-bold font-monts text-md" htmlFor="email">
                  Email
                </label>
                <br />
                <input
                  required
                  className="form-control text-lg"
                  type="email"
                  name="email"
                  placeholder="email..."
                />
              </div>
              <br />
              <div>
                <label
                  className="text-bold font-monts text-md"
                  htmlFor="password"
                >
                  Password
                </label>
                <br />
                <div className="password-box">
                  <input
                    required
                    className="form-control text-lg"
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    placeholder="******"
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
                  className="btn btn-dark w-100 text-md text-bold"
                  type="submit"
                  disabled={isLoading}
                >
                  Register
                </button>
              </div>
              <br />
              <div>
                If you have an account, please <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
    </div>
  );
};

export default Registration;
