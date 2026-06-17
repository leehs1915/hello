import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">행복은행</Link>
        <nav className="nav">
          <Link
            to="/notice"
            className={location.pathname.startsWith('/notice') ? 'active' : ''}
          >
            공지사항
          </Link>
          <Link
            to="/free"
            className={location.pathname.startsWith('/free') ? 'active' : ''}
          >
            자유게시판
          </Link>
        </nav>
      </div>
    </header>
  )
}
