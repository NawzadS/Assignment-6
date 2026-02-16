import { useMovieContext } from "../contexts/MovieContext";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovieContext();

  return (
    <div>
      <h1>Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div>
          {watchlist.map((movie) => (
            <div key={movie.id} style={{ marginBottom: "1rem" }}>
              <p style={{ margin: 0 }}>
                <strong>{movie.title}</strong>
              </p>
              <button onClick={() => removeFromWatchlist(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
