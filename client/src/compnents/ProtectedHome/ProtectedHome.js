import React from "react";
import { Link } from "react-router-dom";
import MovieHooks from "../Hooks/MovieHooks";
import axios from "axios";
import "./Movie.css";

function ProtectedHome() {
  let [, setmovieInput, movieArray, setSubmit] = MovieHooks();

  async function handleAddToFavorite(movieDetail) {
    console.log(movieDetail);
    try {
      let payload = await axios.post(
        `http://localhost:3001/api/users/movies/add-movie`,
        {
          tittle: movieDetail.Title,
          moviePoster: movieDetail.Poster,
          rating: movieDetail.Rating,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(payload);
    } catch (e) {
      console.log(e.response);
    }
  }

  function handleMovieSubmit() {
    setSubmit(true);
  }

  return (
    <div>
      <h1 style={{ color: "white" }}>HOME</h1>
      <div>
        <input onChange={(e) => setmovieInput(e.target.value)} />
        <button onClick={handleMovieSubmit}>Submit</button>
      </div>
      <div className="movie-div">
        {movieArray.map((item) => {
          return (
            <div key={item.data.imdbID}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to={{
                  pathname: `/movie-detail/${item.data.Title}`,
                  search: `?t=${item.data.Title}`,
                }}
              >
                <div>
                  <img src={item.data.Poster} alt={item.data.Title} />
                </div>
                <div>
                  Title: {item.data.Title}
                  <br />
                  Year:{item.data.Year}
                </div>

                <div>Rating: {item.data.imdbRating}</div>
                <br></br>
              </Link>
              <button
                style={{
                  backgroundColor: "red",
                  fontSize: "15px",
                  fontWeight: "boldest",
                  color: "123321",
                }}
                onClick={() => handleAddToFavorite(item.data)}
              >
                ADD FAVORITES
              </button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

export default ProtectedHome;
