import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './movie-info.css'

import api from '../../services/api'

import { toast } from 'react-toastify'

export default function Movie() {
  const { id } = useParams()
  const navigate = useNavigate()
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
          navigate('/', { replace: true })
          return
        })
    }

    loadMovie()

    return () => {
      console.log('componente foi desmontado')
    }
  }, [id, navigate])

  function saveMovie() {
    const minhaLista = localStorage.getItem('@movieFlix')

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === movie.id
    )

    if (hasFilme) {
      toast.warn('Esse filme já está na lista')
      return
    }

    filmesSalvos.push(movie)
    localStorage.setItem('@movieFlix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso')
  }

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
      <div
        className="movieInfoImg"
        style={{
          backgroundImage: `url(https:image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
        alt={movie.title}
      ></div>
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>

      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external noreferrer"
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
