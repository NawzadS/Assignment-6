const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch popular movies')
  const data = await res.json()
  return data.results
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  )
  if (!res.ok) throw new Error('Failed to search movies')
  const data = await res.json()
  return data.results
}
