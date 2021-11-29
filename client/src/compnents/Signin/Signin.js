import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

import CheckToken from "../Hooks/CheckToken";
import Email from "../Hooks/Email";
import PasswordHooks from "../Hooks/PasswordHooks";
import "./Signin.css";

function Signin({ setUser }) {
  const [email, handleEmailOnChange, emailError] = Email();
  const [password, handlePasswordOnChange, passwordError] = PasswordHooks();
  const navigate = useNavigate();
  const { CheckJwtToken } = CheckToken();

  useEffect(() => {
    if (CheckJwtToken()) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });

      window.localStorage.setItem("jwtToken", payload.data.payload);
      let decodedToken = jwtDecode(payload.data.payload);

      setUser({
        email: decodedToken.email,
        userName: decodedToken.userName,
      });

      toast.success("Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/protected-home");
    } catch (e) {
      console.log(e.response.data);
      toast.error("It's tripping from the start", e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="form-div-signin">
      <main className="form-signin">
        <form style={{ marginTop: 150, color: "#FFF" }} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleEmailOnChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div>{emailError && emailError}</div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePasswordOnChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div>{passwordError && passwordError}</div>
          <div className="checkbox mb-3"></div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signin;
