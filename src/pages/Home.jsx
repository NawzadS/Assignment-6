import { useEffect, useState } from 'react'
import MovieGrid from '../components/MovieGrid'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { getPopularMovies } from '../services/movieService'

export default function Home({ searchResults }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // If user searched, show search results instead of popular
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults)
      setLoading(false)
      setError('')
      return
    }

    async function loadPopular() {
      try {
        setLoading(true)
        setError('')
        const results = await getPopularMovies()
        setMovies(results)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadPopular()
  }, [searchResults])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return <MovieGrid movies={movies} />
}
