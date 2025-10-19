import React, { useState, useEffect } from "react";
import filmesData from "./assets/filmes.json";
import "./movieList.css";

function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    image: "",
    link: "#",
  });

  // 🔹 Carrega filmes do JSON + localStorage
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
    setMovies([...filmesData, ...savedMovies]);
  }, []);

  // 🔹 Sorteia filme
  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setSelectedMovie(movies[randomIndex]);
  };

  // 🔹 Atualiza título da aba ao trocar de aba
  const verificar = () => {
    document.title =
      document.visibilityState === "hidden"
        ? "Escolheu? Bom Filme 🍿"
        : "Movie Selector";
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", verificar);
    return () => document.removeEventListener("visibilitychange", verificar);
  }, []);

  // 🔹 Ajuste de tamanho do título
  function getTitleSizeClass(title) {
    return title.length > 26 ? "large-title" : "normal-title";
  }

  // 🔹 Atualiza inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // 🔹 Salva filme no localStorage
  const handleSaveMovie = () => {
    if (!newMovie.title || !newMovie.genre || !newMovie.image) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);

    const userMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
    userMovies.push(newMovie);
    localStorage.setItem("userMovies", JSON.stringify(userMovies));

    setNewMovie({ title: "", genre: "", image: "", link: "#" });
    setShowAddForm(false);
  };

  return (
    <div>
      {selectedMovie && (
        <div className="movie-card">
          <h1 className={getTitleSizeClass(selectedMovie.title)}>
            {selectedMovie.title}
          </h1>
          <p>{selectedMovie.genre}</p>
          <a href={selectedMovie.link} target="_blank" rel="noopener noreferrer">
            <img src={selectedMovie.image} alt={selectedMovie.title} />
          </a>
        </div>
      )}

      <div className="button-container">
        <button onClick={handleRandomMovie}>🎲 Sortear novo Filme</button>
        <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
          ➕ Adicionar Filme
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h2>Adicionar Novo Filme</h2>

          <input
            type="text"
            name="title"
            placeholder="Título do Filme"
            value={newMovie.title}
            onChange={handleInputChange}
          />

          <select
            name="genre"
            value={newMovie.genre}
            onChange={handleInputChange}
          >
            <option value="">Selecione o gênero</option>
            <option value="Ação">Ação</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Terror">Terror</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Romance">Romance</option>
            <option value="Guerra">Guerra</option>
          </select>

          <input
            type="text"
            name="image"
            placeholder="URL da Imagem da Capa"
            value={newMovie.image}
            onChange={handleInputChange}
          />

          <button onClick={handleSaveMovie}>💾 Salvar Filme</button>
        </div>
      )}
    </div>
  );
}

export default MovieList;
