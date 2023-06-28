import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: 'a2e93a3e4491ce6a2bf76a53c7ffd0dc',
            language: 'pt-BR',
          },
        })
        .then((response) => {
          console.log(response.data)
          setMovie(response.data)
          setLoading(false)
        })
        .catch(() => {
          console.log('Filme não encontrado')
        })
    }

    loadMovie()

    return () => {
      console.log('componente foi desmontado')
    }
  }, [id])

  if (loading) {
    return (
      <div className="movie-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  return (
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img
        src={`https:image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>

      <strong>Avaliação: {movie.vote_average} / 10</strong>
    </div>
  )
}
