import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Favorites.css";

function Favorites() {
  const [favoriteArray, setFavoriteArray] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  console.log(favoriteArray);

  async function getMovies() {
    try {
      let payload = await axios.get(
        "http://localhost:3001/api/users/movies/get-movies",
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      setFavoriteArray(payload.data.payload);
      console.log(payload);
    } catch (e) {
      console.log(e.response);
    }
  }

  async function handleDelete(movieID) {
    try {
      let payload = await axios.delete(
        `http://localhost:3001/api/users/movies/delete-movie/${movieID}`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      let newFavoriteMovie = [...favoriteArray];
      let filteredMovieArray = newFavoriteMovie.filter(
        (item) => item._id !== payload.data.payload._id
      );

      setFavoriteArray(filteredMovieArray);
    } catch (e) {
      console.log(e.response);
    }
  }
  return (
    <div className="movie-div">
      <div>
        <h1 style={{ color: "white" }}>Favorite Movies List</h1>
        <br />
        {favoriteArray.map((item) => {
          console.log(item);
          return (
            <div key={item._id}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
                to={{
                  pathname: `/movie-detail/${item.title}`,
                  search: `?t=${item.title}`,
                }}
              >
                <div>
                  <img src={item.moviePoster} alt={item.title} />
                </div>
                <div>
                  Title: {item.tittle}
                  <br />
                  Rating: {item.imdbID}
                </div>
              </Link>
              <br />
              <button
                style={{
                  backgroundColor: "red",
                  fontSize: "20px",
                  fontWeight: "bolder",
                  color: "123321",
                }}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

export default Favorites;
