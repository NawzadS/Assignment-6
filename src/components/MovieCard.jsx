import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export default function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);

  // 🔹 Watchlist from Context
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useMovieContext();
  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    const favs = getFavorites();
    setIsFav(favs.some((m) => m.id === movie.id));
  }, [movie.id]);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster";

  function toggleFavorite() {
    const favs = getFavorites();
    const exists = favs.some((m) => m.id === movie.id);

    const updated = exists
      ? favs.filter((m) => m.id !== movie.id)
      : [...favs, movie];

    saveFavorites(updated);
    setIsFav(!exists);
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "12px" }}
      />

      <h3 style={{ marginTop: "0.75rem" }}>{movie.title}</h3>
      <p style={{ margin: 0 }}>Rating: {movie.vote_average}</p>

      {/* Favorites */}
      <button
        onClick={toggleFavorite}
        style={{ marginTop: "0.75rem", cursor: "pointer" }}
      >
        {isFav ? "Unfavorite" : "Favorite"}
      </button>

      {/* Watchlist */}
      <button
        onClick={() => {
          if (inWatchlist) removeFromWatchlist(movie.id);
          else addToWatchlist(movie);
        }}
        style={{ marginTop: "0.5rem", cursor: "pointer" }}
      >
        {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}
