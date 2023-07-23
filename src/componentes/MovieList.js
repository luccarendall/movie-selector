import React, { useState } from "react";
import filmesData from "./assets/filmes.json";
import "./movieList.css";

function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * filmesData.length);
    setSelectedMovie(filmesData[randomIndex]);
  };

  function getTitleSizeClass(title) {
    if (title.length > 26) {
      return "large-title";
    } else {
      return "normal-title";
    }
  }

  return (
    <div>
      {selectedMovie && (
        <div className="movie-card">
          <h1 className={getTitleSizeClass(selectedMovie.title)}>{selectedMovie.title}</h1>
          <p>{selectedMovie.genre}</p>
          <a href={selectedMovie.link} target="_blank">
            <img src={selectedMovie.image} alt={selectedMovie.title} />
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
