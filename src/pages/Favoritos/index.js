import { useState, useEffect } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Favoritos() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const minhaLista = localStorage.getItem('@movieFlix')
    setMovies(JSON.parse(minhaLista) || [])
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = movies.filter((item) => {
      return item.id !== id
    })

    setMovies(filtroFilmes)
    localStorage.setItem('@movieFlix', JSON.stringify(filtroFilmes))
    toast.success('Filme removido com sucesso')
  }

  return (
    <div className="myMovies">
      <h1>Meus filmes favoritos</h1>

      {movies.length === 0 && (
        <span>Você não possui nenhum filme salvo :( </span>
      )}

      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(movie.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
