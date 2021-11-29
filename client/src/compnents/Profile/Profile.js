import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import CheckToken from "../Hooks/CheckToken";
import "./Profile.css";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const navigate = useNavigate();
  const { CheckJwtToken } = CheckToken();

  useEffect(() => {
    if (CheckJwtToken()) {
      navigate("/profile");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload = await axios.put(
        "http://localhost:3001/api/users/update-profile",
        {
          firstName,
          lastName,
          userName,
          password,
          comfirmPassword,
        }
      );

      toast.success("Success", {
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
    <div className="form-div-profile">
      <main className="form-profile">
        <form style={{ marginTop: 150, color: "#FFF" }} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Update User</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Comfirm Password"
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Comfirm Password</label>
          </div>
          <div className="checkbox mb-3"></div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
      <hr />
      <div>
        <Link to={"/protected/favorites"} className="nav-link">
          <h1 style={{ color: "white" }}> My Favorite Movies</h1>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
