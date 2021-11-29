import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

function MovieHooks() {
  const [movieInput, setmovieInput] = useState("");
  const [movieArray, setMovieArray] = useState([]);

  const [submit, setSubmit] = useState(false);
  const { search } = useLocation();

  const navigate = useNavigate();
  function getRandomMovie() {
    let randomMoviesArray = [
      "superman",
      "terminator",
      "the lord of the rings",
      "harry potter",
      "batman",
      "predator",
      "pokemon",
      "saw",
    ];

    let randomIndex = Math.floor(Math.random() * randomMoviesArray.length);

    return randomMoviesArray[randomIndex];
  }

  async function getMovie(movieTitle) {
    //window.history.pushState("", "", `/protected-home?s=${movieTitle}`);
    navigate(`/protected-home?s=${movieTitle}`, {
      replace: true,
    });
    try {
      let payload = await axios.get(
        `http://omdbapi.com/?apikey=205a8ca&s=${movieTitle}`
      );

      let movieIdArray = payload.data.Search.map((item) => item.imdbID);

      let promiseMovieArray = movieIdArray.map(async (item) => {
        return await axios.get(`http://omdbapi.com/?apikey=205a8ca&i=${item}`);
      });

      Promise.all(promiseMovieArray)
        .then((result) => {
          setMovieArray(result);
          console.log(movieArray);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {}
  }

  useEffect(() => {
    if (submit) {
      setSubmit(false);
      getMovie(movieInput);
    }
  }, [submit]);

  useEffect(() => {
    const values = queryString.parse(search);
    console.log(values);
    if (values.s) {
      getMovie(values.s);
    } else {
      getMovie(getRandomMovie());
    }
  }, []);

  return [movieInput, setmovieInput, movieArray, setSubmit];
}

export default MovieHooks;
