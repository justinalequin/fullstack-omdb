import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

import ProtectedHome from "./compnents/ProtectedHome/ProtectedHome";
import PrivateRoute from "./compnents/PrivateRoute/PrivateRoute";
import Profile from "./compnents/Profile/Profile";
import Favorites from "./compnents/Favorites/Favorites";
import Signin from "./compnents/Signin/Signin";
import Signup from "./compnents/Signup/Signup";
import Nav from "./compnents/Nav/Nav";
import "./App.css";

import MovieDetail from "./compnents/Movie/MovieDetail";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");
    console.log(jwtToken);

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);
      console.log(decodedToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        setUser(null);
      } else {
        setUser({
          email: decodedToken.email,
          userName: decodedToken.userName,
        });
      }
    }
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "#123321" }}>
      <ToastContainer theme="colored" />
      <Router>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/movie-detail/:name" element={<MovieDetail />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin setUser={setUser} />} />
          <Route
            path="/protected-home"
            element={
              <PrivateRoute>
                <ProtectedHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/protected/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProtectedHome />
              </PrivateRoute>
            }
          />
          <Route render={() => <h1>Not Found 404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
