import { useNavigate } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { notices, posts } = useBoard()

  const latestNotices = [...notices].slice(0, 5)
  const latestPosts = [...posts].slice(0, 5)

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-logo">행복은행</div>
        <div className="home-search">
          <input type="text" placeholder="검색어를 입력하세요" readOnly />
          <button type="button">검색</button>
        </div>
        <div className="home-shortcuts">
          <button onClick={() => navigate('/notice')}>📢 공지사항</button>
          <button onClick={() => navigate('/free')}>💬 자유게시판</button>
          <button onClick={() => navigate('/free/write')}>✏️ 글쓰기</button>
        </div>
      </div>

      <div className="home-boards">
        <div className="board-preview">
          <div className="board-preview-header">
            <h2>공지사항</h2>
            <button onClick={() => navigate('/notice')}>더보기 &rsaquo;</button>
          </div>
          <ul className="board-preview-list">
            {latestNotices.map(n => (
              <li key={n.id} onClick={() => navigate(`/notice/${n.id}`)}>
                {n.isPinned && <span className="pin-badge">공지</span>}
                <span className="preview-title">{n.title}</span>
                <span className="preview-date">{n.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="board-preview">
          <div className="board-preview-header">
            <h2>자유게시판</h2>
            <button onClick={() => navigate('/free')}>더보기 &rsaquo;</button>
          </div>
          <ul className="board-preview-list">
            {latestPosts.map(p => (
              <li key={p.id} onClick={() => navigate(`/free/${p.id}`)}>
                <span className="preview-title">{p.title}</span>
                <span className="preview-date">{p.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
