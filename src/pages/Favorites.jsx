import { useEffect, useState } from 'react'
import MovieGrid from '../components/MovieGrid'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(favs)
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some movies!</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}
