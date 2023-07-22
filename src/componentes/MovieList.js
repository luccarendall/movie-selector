import React, { useState } from "react";
import filmesData from "./assets/filmes.json";
import "./movieList.css";

function MovieList() {
  const [randomMovie, setRandomMovie] = useState(null);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * filmesData.length);
    setRandomMovie(filmesData[randomIndex]);
  };

  function getTitleSizeClass(title) {
    if (title.length > 30) {
      return "small-title";
    } else if (title.length > 20) {
      return "medium-title";
    } else {
      return "large-title";
    }
  }

  return (
    <div>
      {randomMovie && (
        <div className="movie-card">
          <h1 className={getTitleSizeClass(randomMovie.title)}>{randomMovie.title}</h1>
          <a href={randomMovie.link} target="_blank" rel="noopener noreferrer">
            <img src={randomMovie.image} alt={randomMovie.title} />
          </a>
        </div>
      )}
      <div className="button-container">
        <button onClick={handleRandomMovie}>Sortear novo Filme</button>
      </div>
    </div>
  );
}

export default MovieList;
