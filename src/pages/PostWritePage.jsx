import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'

export default function PostWritePage({ board }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()
  const { addPost } = useBoard()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!author.trim()) return alert('작성자를 입력해주세요.')
    if (!title.trim()) return alert('제목을 입력해주세요.')
    if (!content.trim()) return alert('내용을 입력해주세요.')
    const id = addPost(title.trim(), content.trim(), author.trim(), board)
    navigate(`/${board}/${id}`)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>글쓰기</h1>
      </div>
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">작성자</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
            maxLength={20}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={12}
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-back" onClick={() => navigate(`/${board}`)}>
            취소
          </button>
          <button type="submit" className="btn-submit">
            등록
          </button>
        </div>
      </form>
    </div>
  )
}
