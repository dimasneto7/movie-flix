import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './Home.css'

// url da api: /movie/now_playing?api_key=a2e93a3e4491ce6a2bf76a53c7ffd0dc

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'a2e93a3e4491ce6a2bf76a53c7ffd0dc',
          language: 'pt-BR',
          page: 1,
        },
      })

      // console.log(response)
      setMovies(response.data.results.slice(0, 10))
      setLoading(false)
    }

    loadMovies()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-movies">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img
                src={`https:image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
