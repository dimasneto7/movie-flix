import './header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Movie Flix
      </Link>
      <Link className="favoritos" to="/favoritos">
        Meus filmes
      </Link>
    </header>
  )
}
