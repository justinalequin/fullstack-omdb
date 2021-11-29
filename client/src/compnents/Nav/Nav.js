import React from "react";
import { Link } from "react-router-dom";

function Nav({ user, setUser }) {
  let linkTittle1 = user ? user.userName : "Sign up";
  let link1 = user ? "/profile" : "/sign-up";

  let linkTittle2 = user ? "Logout" : "Sign in";
  let link2 = user ? "/" : "/Sign-in";
  console.log(user);

  let logoutBotton = user ? logout : () => {};

  function logout() {
    setUser(null);
    window.localStorage.removeItem("jwtToken");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/protected-home" className="navbar-brand" href="#">
          <h1 style={{ color: "white" }}>OMDB Movies APP</h1>
        </Link>
        <div
          style={{
            alignContent: "center",
          }}
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "red",
              color: "252525",
            }}
            className="navbar-nav"
          >
            <li className="nav-item">
              <Link to={link1} className="nav-link active" aria-current="page">
                <h2 style={{ color: "white" }}>{linkTittle1}</h2>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={link2}
                className="nav-link"
                onClick={() => logoutBotton()}
              >
                <h2 style={{ color: "white" }}>{linkTittle2}</h2>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/protected/favorites"} className="nav-link">
                <h2 style={{ color: "white" }}>Favorites</h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
