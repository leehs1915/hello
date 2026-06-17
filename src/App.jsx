import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BoardProvider } from './context/BoardContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import NoticePage from './pages/NoticePage'
import FreeBoardPage from './pages/FreeBoardPage'
import PostDetailPage from './pages/PostDetailPage'
import PostWritePage from './pages/PostWritePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BoardProvider>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/:id" element={<PostDetailPage board="notice" />} />
            <Route path="/free" element={<FreeBoardPage />} />
            <Route path="/free/write" element={<PostWritePage board="free" />} />
            <Route path="/free/:id" element={<PostDetailPage board="free" />} />
          </Routes>
        </main>
      </BoardProvider>
    </BrowserRouter>
  )
}

export default App
