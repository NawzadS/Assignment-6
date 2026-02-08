import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleChange(e) {
    const val = e.target.value
    setQuery(val)
    onSearch(val)
  }

  return (
    <header
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
        MovieShelf
      </Link>

      <input
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
        style={{ padding: '0.5rem', flex: 1 }}
      />

      <Link to="/favorites">Favorites</Link>
    </header>
  )
}
