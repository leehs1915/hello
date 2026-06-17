import { useNavigate } from 'react-router-dom'

export default function PostTable({ posts, board }) {
  const navigate = useNavigate()
  const regularPosts = posts.filter(p => !p.isPinned)

  return (
    <table className="post-table">
      <thead>
        <tr>
          <th className="col-num">번호</th>
          <th className="col-title">제목</th>
          <th className="col-author">작성자</th>
          <th className="col-date">날짜</th>
          <th className="col-views">조회</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => {
          const num = post.isPinned ? null : regularPosts.length - regularPosts.indexOf(post)
          return (
            <tr
              key={post.id}
              onClick={() => navigate(`/${board}/${post.id}`)}
              className={post.isPinned ? 'pinned' : ''}
            >
              <td className="col-num">
                {post.isPinned ? <span className="pin-badge">공지</span> : num}
              </td>
              <td className="col-title">
                <span className="title-text">{post.title}</span>
              </td>
              <td className="col-author">{post.author}</td>
              <td className="col-date">{post.date}</td>
              <td className="col-views">{post.views}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
