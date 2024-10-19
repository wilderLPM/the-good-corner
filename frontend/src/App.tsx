import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.module.css'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './components/Layout'
import AdPage from './pages/AdPage'
import NewAddForm from './pages/NewAddForm'
import Category from './pages/Category'
import { CartProvider } from './contexts/CartContext'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/ads" element={<Category />} /> créer des slugs dans categories
            <Route path="/about" element={<About />} />
            <Route path="/ads/new" element={<NewAddForm />} />
            <Route path="/ads/:id" element={<AdPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
};