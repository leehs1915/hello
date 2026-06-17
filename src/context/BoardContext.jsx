import { createContext, useContext, useState, useEffect } from 'react'

const BoardContext = createContext(null)

const SAMPLE_NOTICES = [
  {
    id: 1,
    title: '커뮤니티 이용 규칙 안내',
    author: '관리자',
    date: '2026-06-15',
    views: 342,
    isPinned: true,
    content: '안녕하세요. 커뮤니티 이용 규칙을 안내드립니다.\n\n1. 욕설 및 비방 금지\n2. 광고성 게시물 금지\n3. 개인정보 공유 금지\n\n위반 시 제재를 받을 수 있습니다.',
  },
  {
    id: 2,
    title: '시스템 점검 안내 (6/20 새벽 2시~4시)',
    author: '관리자',
    date: '2026-06-14',
    views: 218,
    isPinned: true,
    content: '6월 20일 새벽 2시~4시 사이 시스템 점검이 진행됩니다.\n해당 시간 동안 서비스 이용이 일시 중단됩니다.',
  },
  {
    id: 3,
    title: '신규 기능 업데이트 안내',
    author: '관리자',
    date: '2026-06-10',
    views: 189,
    isPinned: false,
    content: '새로운 기능이 업데이트되었습니다.\n\n- 게시글 검색 기능 추가\n- 댓글 기능 개선\n- 모바일 UI 최적화',
  },
]

const SAMPLE_POSTS = [
  {
    id: 1,
    title: '오늘 날씨가 너무 좋네요',
    author: '하늘바람',
    date: '2026-06-17',
    views: 45,
    content: '오늘 날씨가 정말 맑고 좋네요. 다들 기분 좋은 하루 되세요!',
  },
  {
    id: 2,
    title: '추천 영화 있으면 공유해주세요',
    author: '영화팬',
    date: '2026-06-17',
    views: 128,
    content: '요즘 볼만한 영화가 없어서요. 최근에 재미있게 본 영화 추천 부탁드립니다.',
  },
  {
    id: 3,
    title: '리액트 공부 중인데 어렵네요',
    author: '코딩초보',
    date: '2026-06-16',
    views: 76,
    content: 'React 독학 중인데 state 개념이 헷갈립니다. 좋은 학습 자료 있으면 공유 부탁드려요.',
  },
  {
    id: 4,
    title: '맛있는 파스타 레시피 공유합니다',
    author: '요리왕',
    date: '2026-06-16',
    views: 203,
    content: '집에서 쉽게 만들 수 있는 까르보나라 레시피입니다.\n\n재료: 스파게티, 베이컨, 달걀노른자, 파르메산 치즈, 후추\n\n1. 스파게티를 10분간 삶아줍니다.\n2. 팬에 베이컨을 볶습니다.\n3. 달걀노른자와 치즈를 섞어 소스를 만듭니다.\n4. 불을 끄고 소스와 면을 버무려 완성합니다.',
  },
  {
    id: 5,
    title: '주말에 뭐 하세요?',
    author: '주말러',
    date: '2026-06-15',
    views: 89,
    content: '다가오는 주말 계획이 있으신가요? 저는 한강 공원에 나가려고 합니다.',
  },
]

export function BoardProvider({ children }) {
  const [notices, setNotices] = useState(() => {
    try {
      const saved = localStorage.getItem('notices')
      return saved ? JSON.parse(saved) : SAMPLE_NOTICES
    } catch {
      return SAMPLE_NOTICES
    }
  })

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('posts')
      return saved ? JSON.parse(saved) : SAMPLE_POSTS
    } catch {
      return SAMPLE_POSTS
    }
  })

  useEffect(() => {
    localStorage.setItem('notices', JSON.stringify(notices))
  }, [notices])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const addPost = (title, content, author, board) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author,
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    }
    if (board === 'notice') {
      setNotices(prev => [{ ...newPost, isPinned: false }, ...prev])
    } else {
      setPosts(prev => [newPost, ...prev])
    }
    return newPost.id
  }

  const incrementViews = (id, board) => {
    if (board === 'notice') {
      setNotices(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p))
    } else {
      setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p))
    }
  }

  const deletePost = (id, board) => {
    if (board === 'notice') {
      setNotices(prev => prev.filter(p => p.id !== id))
    } else {
      setPosts(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <BoardContext.Provider value={{ notices, posts, addPost, incrementViews, deletePost }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => useContext(BoardContext)
