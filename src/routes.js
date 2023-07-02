import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Movie from './pages/Movie'
import Error from './pages/Error'
import Favoritos from './pages/Favoritos'

import Header from './components/Header'

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
