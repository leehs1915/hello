import { useNavigate } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'
import PostTable from '../components/PostTable'

export default function FreeBoardPage() {
  const { posts } = useBoard()
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-header">
        <h1>자유게시판</h1>
        <div className="header-right">
          <span className="post-count">총 {posts.length}건</span>
          <button className="btn-write" onClick={() => navigate('/free/write')}>
            글쓰기
          </button>
        </div>
      </div>
      <PostTable posts={posts} board="free" />
    </div>
  )
}
