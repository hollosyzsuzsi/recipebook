import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/homepage/HomePage'
import { NotFoundPage } from '../pages/notfoundpage/NotFoundPage'
import { FavoritesPage } from '../pages/favoritespage/FavoritesPage'
import { Layout } from './Layout'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
