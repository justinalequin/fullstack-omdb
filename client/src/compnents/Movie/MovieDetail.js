import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Hooks/Loading";

function MovieDetail() {
  const [movieList, setMovieList] = useState([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    getMoviesInfo();
  }, []);

  async function getMoviesInfo() {
    try {
      let payload = await axios.get(
        `https://omdbapi.com/?apikey=205a8ca&t=${name}`
      );
      console.log(name);
      setMovieList(payload.data);
      console.log(payload.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ color: "white" }}>
          <div>
            <img src={movieList.Poster} alt={movieList.Title} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div>
              <h2>Title: {movieList.Title}</h2>
            </div>

            <br></br>

            <div>
              <h2>Plot: {movieList.Plot}</h2>{" "}
            </div>

            <br></br>

            <div>
              <h2>Rating: {movieList.imdbRating} / 10</h2>
            </div>

            <br></br>

            <div>Actors: {movieList.Actors}</div>

            <br></br>

            <div>Country: {movieList.Country} </div>

            <br></br>
            <div>Rated: {movieList.Rated}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
