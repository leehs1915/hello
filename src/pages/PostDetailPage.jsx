import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'

export default function PostDetailPage({ board }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notices, posts, incrementViews, deletePost } = useBoard()
  const viewed = useRef(false)

  const list = board === 'notice' ? notices : posts
  const post = list.find(p => p.id === Number(id))

  useEffect(() => {
    if (post && !viewed.current) {
      viewed.current = true
      incrementViews(Number(id), board)
    }
  }, [id])

  if (!post) {
    return (
      <div className="page">
        <p className="empty-msg">게시글을 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(Number(id), board)
      navigate(`/${board}`)
    }
  }

  const boardName = board === 'notice' ? '공지사항' : '자유게시판'

  return (
    <div className="page">
      <div className="page-header">
        <h1>{boardName}</h1>
      </div>
      <div className="post-detail">
        <div className="post-detail-header">
          {post.isPinned && <span className="pin-badge">공지</span>}
          <h2>{post.title}</h2>
          <div className="post-meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>조회 {post.views}</span>
          </div>
        </div>
        <div className="post-content">
          {post.content.split('\n').map((line, i) => (
            <p key={i}>{line || <br />}</p>
          ))}
        </div>
        <div className="post-actions">
          <button className="btn-back" onClick={() => navigate(`/${board}`)}>
            목록으로
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
