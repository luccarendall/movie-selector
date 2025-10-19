import React, { useState, useEffect } from "react";
import filmesData from "./assets/filmes.json";
import "./movieList.css";

function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState(filmesData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    image: "",
    link: "#",
  });

  // 🔹 Carrega filmes do localStorage quando o componente monta
  useEffect(() => {
    const storedMovies = localStorage.getItem("userMovies");
    if (storedMovies) {
      setMovies([...filmesData, ...JSON.parse(storedMovies)]);
    }
  }, []);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setSelectedMovie(movies[randomIndex]);
  };

  const getTitleSizeClass = (title) =>
    title.length > 26 ? "large-title" : "normal-title";

  // 🔹 Atualiza o título da aba
  const verificar = () => {
    if (document.visibilityState === "hidden") {
      document.title = "Escolheu? Bom Filme 🍿";
    } else {
      document.title = "Movie Selector";
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", verificar);
    return () => document.removeEventListener("visibilitychange", verificar);
  }, []);

  // 🔹 Atualiza valores dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // 🔹 Salva o novo filme no localStorage e atualiza lista
  const handleSaveMovie = () => {
    if (!newMovie.title || !newMovie.genre || !newMovie.image) {
      alert("Preencha todos os campos!");
      return;
    }

    const updatedList = [...movies, newMovie];
    setMovies(updatedList);

    const stored = JSON.parse(localStorage.getItem("userMovies")) || [];
    stored.push(newMovie);
    localStorage.setItem("userMovies", JSON.stringify(stored));

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
        <button onClick={handleRandomMovie}>Sortear novo Filme</button>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancelar" : "Adicionar Filme"}
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
            onChange={handleChange}
          />
          <select name="genre" value={newMovie.genre} onChange={handleChange}>
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
            placeholder="URL da imagem da capa"
            value={newMovie.image}
            onChange={handleChange}
          />
          <button onClick={handleSaveMovie}>Salvar Filme</button>
        </div>
      )}
    </div>
  );
}

export default MovieList;
