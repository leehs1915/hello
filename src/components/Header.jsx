import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate('/free')
  }

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">행복은행</Link>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">검색</button>
        </form>
      </div>
      <div className="header-nav">
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>홈</Link>
          <Link to="/notice" className={location.pathname.startsWith('/notice') ? 'active' : ''}>공지사항</Link>
          <Link to="/free" className={location.pathname.startsWith('/free') ? 'active' : ''}>자유게시판</Link>
        </nav>
      </div>
    </header>
  )
}
