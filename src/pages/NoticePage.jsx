import { useBoard } from '../context/BoardContext'
import PostTable from '../components/PostTable'

export default function NoticePage() {
  const { notices } = useBoard()
  const pinned = notices.filter(n => n.isPinned)
  const regular = notices.filter(n => !n.isPinned)

  return (
    <div className="page">
      <div className="page-header">
        <h1>공지사항</h1>
        <span className="post-count">총 {notices.length}건</span>
      </div>
      <PostTable posts={[...pinned, ...regular]} board="notice" />
    </div>
  )
}
