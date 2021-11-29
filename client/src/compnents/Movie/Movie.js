import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movie.css";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      let payload = await axios.get(
        `https://omdbapi.com/?apikey=205a8ca&s=batman`
      );
      setMovieList(payload.data.Search);
    } catch (e) {
      console.log(e);
    }
  }

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  async function handleOnClick(event) {
    try {
      let payload = await axios.get(
        `https://omdbapi.com/?apikey=205a8ca&s=${inputValue}`
      );
      setMovieList(payload.data.Search);
      let movieArray = payload.data.Search.map((item) => item.imdbID);
      let promiseMoviesArray = movieArray.map(async (item) => {
        return await axios.get(`https://omdbapi.com/?apikey=205a8ca&s=${item}`);
      });
      Promise.all(promiseMoviesArray)
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(movieList);
    } catch (e) {
      if (e.response.status === 404) {
        setError(e.response.data.Error);
      }
      console.log(e);
    }
  }

  function addToFavoritesMovie() {}

  return (
    <div style={{ backgroundColor: "#252525" }}>
      <div>
        <input
          type="text"
          placeholder="Search Movie"
          name="movie"
          onChange={handleOnChange}
          value={inputValue}
        />
        <button onClick={handleOnClick}>Search</button>
        <div>{error && error}</div>
      </div>
      <div className="movie-div">
        {movieList.map((item) => {
          console.log(item);
          return (
            <div key={item.imdbID}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to={{
                  pathname: `/movie-detail/${item.Title}`,
                  search: `?t=${item.Title}`,
                }}
              >
                <div>
                  <img src={item.Poster} alt={item.Title} />
                </div>
                <div>
                  Title: {item.Title}
                  <br />
                  Year:{item.Year}
                </div>
                Rating:
              </Link>
              <button onClick={addToFavoritesMovie}>ADD Favorites</button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

export default Movie;
