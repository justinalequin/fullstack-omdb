import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import CheckToken from "../Hooks/CheckToken";

import FirstNameHooks from "../Hooks/FirstNameHooks";
import LastNameHooks from "../Hooks/LastNameHooks";
import UserNameHooks from "../Hooks/UsernameHooks";
import Email from "../Hooks/Email";
import PasswordHooks from "../Hooks/PasswordHooks";
import "./Signup.css";

function Signup() {
  const [
    firstName,
    handleFirstNameOnChange,
    firstNameError,
    setFirstNameOnFocus,
    setFirstNameOnBlur,
  ] = FirstNameHooks();
  const [
    lastName,
    handleLastNameOnChange,
    LastNameError,
    setOnFocus,
    setOnBlur,
  ] = LastNameHooks();
  const [
    userName,
    handleUserNameOnChange,
    userNameError,
    userNameOnFocus,
    userNameOnBlur,
  ] = UserNameHooks();
  const [
    email,
    handleEmailOnChange,
    emailError,
    setEmailOnFocus,
    setEmailOnBlur,
  ] = Email();
  const [
    password,
    handlePasswordOnChange,
    passwordError,
    setPasswordOnFocus,
    setPasswordOnBlur,
  ] = PasswordHooks();

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
      let payload = await axios.post(
        "http://localhost:3001/api/users/create-user",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        }
      );

      toast.success("Success! Please login!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(payload);
    } catch (e) {
      toast.error(e.response.data.error, {
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
          <h1 className="h3 mb-3 fw-normal">Please sign up!</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="First Name"
              onChange={handleFirstNameOnChange}
              onFocus={() => setFirstNameOnFocus(true)}
              onBlur={() => setFirstNameOnBlur(true)}
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div>{firstNameError && firstNameError}</div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Last Name"
              onChange={handleLastNameOnChange}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnBlur(true)}
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div>{LastNameError && LastNameError}</div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={handleUserNameOnChange}
              onFocus={() => userNameOnFocus(true)}
              onBlur={() => userNameOnBlur(true)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div>{userNameError && userNameError}</div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleEmailOnChange}
              onFocus={() => setEmailOnFocus(true)}
              onBlur={() => setEmailOnBlur(true)}
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>
          <div>{emailError && emailError}</div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePasswordOnChange}
              onFocus={() => setPasswordOnFocus(true)}
              onBlur={() => setPasswordOnBlur(true)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div>{passwordError && passwordError}</div>
          <div className="checkbox mb-3"></div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;
