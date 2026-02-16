import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";

import { searchMovies } from "./services/movieService";
import { MovieProvider } from "./contexts/MovieContext";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(query) {
    try {
      setError("");

      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || "Search failed");
    }
  }

  return (
    <MovieProvider>
      <Header onSearch={handleSearch} />

      {error && <p style={{ color: "red", paddingLeft: "1rem" }}>{error}</p>}

      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </MovieProvider>
  );
}
