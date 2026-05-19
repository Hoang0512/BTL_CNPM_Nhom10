import { useState, useEffect } from 'react';
import { User, Comic, Chapter, Comment, ReadingHistory } from './types';
import { getComics, saveComics, genres } from './data/comics';
import { registerUser, loginUser } from './data/users';

// Icons
const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'fill-red-500' : ''}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Main App Component
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [comics, setComics] = useState<Comic[]>([]);
  const [view, setView] = useState<'home' | 'detail' | 'reader' | 'admin' | 'favorites' | 'history' | 'ranking'>('home');
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'hot' | 'new'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState('');

  // Admin state
  const [editingComic, setEditingComic] = useState<Comic | null>(null);
  const [showComicForm, setShowComicForm] = useState(false);

  // Load data
  useEffect(() => {
    setComics(getComics());
    
    // Load favorites
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    // Load history
    const storedHistory = localStorage.getItem('readingHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
    
    // Load comments
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Save current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Filter comics
  const filteredComics = comics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comic.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || comic.genres.includes(selectedGenre);
    const matchesStatus = selectedStatus === 'all' || comic.status === selectedStatus;
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'hot' && comic.isHot) || 
                       (selectedType === 'new' && comic.isNew);
    return matchesSearch && matchesGenre && matchesStatus && matchesType;
  });

  // Get favorites comics
  const favoriteComics = comics.filter(c => favorites.includes(c.id));

  // Get ranking comics
  const getRankedComics = (period: 'day' | 'week' | 'month') => {
    const multiplier = period === 'day' ? 0.1 : period === 'week' ? 0.5 : 1;
    return [...comics]
      .sort((a, b) => (b.views * multiplier) - (a.views * multiplier))
      .slice(0, 10);
  };

  // Auth handlers
  const handleLogin = (username: string, password: string) => {
    const result = loginUser(username, password);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setShowAuthModal(false);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleRegister = (username: string, password: string) => {
    const result = registerUser(username, password);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setShowAuthModal(false);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  // Favorite handlers
  const toggleFavorite = (comicId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    const newFavorites = favorites.includes(comicId)
      ? favorites.filter(id => id !== comicId)
      : [...favorites, comicId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // History handlers
  const addToHistory = (comic: Comic, chapter: Chapter, pageIndex: number) => {
    if (!currentUser) return;
    
    const newHistory = history.filter(h => !(h.userId === currentUser.id && h.comicId === comic.id && h.chapterId === chapter.id));
    newHistory.unshift({
      userId: currentUser.id,
      comicId: comic.id,
      comicTitle: comic.title,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      pageIndex,
      readAt: new Date().toISOString()
    });
    
    const limitedHistory = newHistory.slice(0, 50);
    setHistory(limitedHistory);
    localStorage.setItem('readingHistory', JSON.stringify(limitedHistory));
    
    // Increment views
    const updatedComics = comics.map(c => 
      c.id === comic.id ? { ...c, views: c.views + 1 } : c
    );
    setComics(updatedComics);
    saveComics(updatedComics);
  };

  // Comment handlers
  const addComment = (comicId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      comicId,
      userId: currentUser.id,
      username: currentUser.username,
      content: content.trim(),
      createdAt: new Date().toISOString()
    };
    
    const newComments = {
      ...comments,
      [comicId]: [...(comments[comicId] || []), comment]
    };
    
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setNewComment('');
  };

  // Admin handlers
  const handleSaveComic = (comicData: Partial<Comic>) => {
    let updatedComics: Comic[];
    
    if (editingComic) {
      updatedComics = comics.map(c => 
        c.id === editingComic.id ? { ...c, ...comicData } : c
      );
    } else {
      const newComic: Comic = {
        id: `comic-${Date.now()}`,
        title: comicData.title || '',
        author: comicData.author || '',
        genres: comicData.genres || [],
        status: comicData.status || 'ongoing',
        coverImage: comicData.coverImage || 'https://picsum.photos/seed/new/400/600',
        description: comicData.description || '',
        chapters: [],
        views: 0,
        rating: 0,
        ratingCount: 0,
        isHot: comicData.isHot || false,
        isNew: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updatedComics = [...comics, newComic];
    }
    
    setComics(updatedComics);
    saveComics(updatedComics);
    setShowComicForm(false);
    setEditingComic(null);
  };

  const handleDeleteComic = (comicId: string) => {
    if (!confirm('Bạn có chắc muốn xóa truyện này?')) return;
    
    const updatedComics = comics.filter(c => c.id !== comicId);
    setComics(updatedComics);
    saveComics(updatedComics);
  };

  const handleSaveChapter = (comicId: string, chapterData: Partial<Chapter>) => {
    const updatedComics = comics.map(comic => {
      if (comic.id !== comicId) return comic;
      
      let updatedChapters: Chapter[];
      const existingChapter = comic.chapters.find(c => c.id === chapterData.id);
      
      if (existingChapter) {
        updatedChapters = comic.chapters.map(c => 
          c.id === chapterData.id ? { ...c, ...chapterData } : c
        );
      } else {
        const newChapter: Chapter = {
          id: `chapter-${Date.now()}`,
          comicId,
          number: chapterData.number || comic.chapters.length + 1,
          title: chapterData.title || `Chương ${comic.chapters.length + 1}`,
          pages: chapterData.pages || [],
          createdAt: new Date().toISOString()
        };
        updatedChapters = [...comic.chapters, newChapter];
      }
      
      return { 
        ...comic, 
        chapters: updatedChapters.sort((a, b) => a.number - b.number),
        updatedAt: new Date().toISOString()
      };
    });
    
    setComics(updatedComics);
    saveComics(updatedComics);
  };

  const handleDeleteChapter = (comicId: string, chapterId: string) => {
    if (!confirm('Bạn có chắc muốn xóa chương này?')) return;
    
    const updatedComics = comics.map(comic => {
      if (comic.id !== comicId) return comic;
      return {
        ...comic,
        chapters: comic.chapters.filter(c => c.id !== chapterId)
      };
    });
    
    setComics(updatedComics);
    saveComics(updatedComics);
  };

  // View handlers
  const openComicDetail = (comic: Comic) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSelectedComic(comic);
    setView('detail');
  };

  const openReader = (comic: Comic, chapter: Chapter) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSelectedComic(comic);
    setSelectedChapter(chapter);
    addToHistory(comic, chapter, 0);
    setView('reader');
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    if (!selectedComic || !selectedChapter) return;
    
    const currentIndex = selectedComic.chapters.findIndex(c => c.id === selectedChapter.id);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < selectedComic.chapters.length) {
      const newChapter = selectedComic.chapters[newIndex];
      setSelectedChapter(newChapter);
      addToHistory(selectedComic, newChapter, 0);
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < Math.round(rating)} />
    ));
  };

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  // Time ago
  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
  };

  // User history
  const userHistory = currentUser 
    ? history.filter(h => h.userId === currentUser.id)
    : [];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => { setView('home'); setSelectedComic(null); }}
            >
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TruyenTranhVN
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setView('home')}
                className={`font-medium transition ${view === 'home' ? 'text-purple-600' : darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setView('ranking')}
                className={`font-medium transition ${view === 'ranking' ? 'text-purple-600' : darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}
              >
                Bảng xếp hạng
              </button>
              {currentUser && (
                <>
                  <button
                    onClick={() => setView('favorites')}
                    className={`font-medium transition ${view === 'favorites' ? 'text-purple-600' : darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}
                  >
                    Yêu thích
                  </button>
                  <button
                    onClick={() => setView('history')}
                    className={`font-medium transition ${view === 'history' ? 'text-purple-600' : darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}
                  >
                    Lịch sử
                  </button>
                </>
              )}
              {currentUser?.isAdmin && (
                <button
                  onClick={() => setView('admin')}
                  className={`font-medium transition ${view === 'admin' ? 'text-purple-600' : darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}
                >
                  Quản lý
                </button>
              )}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>

              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className={`hidden sm:inline text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {currentUser.username}
                    {currentUser.isAdmin && <span className="ml-1 text-purple-500">(Admin)</span>}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition text-sm font-medium"
                >
                  Đăng nhập
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`md:hidden p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <nav className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setView('home'); setShowMobileMenu(false); }}
                  className={`px-4 py-2 text-left rounded-lg transition ${view === 'home' ? 'bg-purple-100 text-purple-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => { setView('ranking'); setShowMobileMenu(false); }}
                  className={`px-4 py-2 text-left rounded-lg transition ${view === 'ranking' ? 'bg-purple-100 text-purple-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  Bảng xếp hạng
                </button>
                {currentUser && (
                  <>
                    <button
                      onClick={() => { setView('favorites'); setShowMobileMenu(false); }}
                      className={`px-4 py-2 text-left rounded-lg transition ${view === 'favorites' ? 'bg-purple-100 text-purple-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      Yêu thích
                    </button>
                    <button
                      onClick={() => { setView('history'); setShowMobileMenu(false); }}
                      className={`px-4 py-2 text-left rounded-lg transition ${view === 'history' ? 'bg-purple-100 text-purple-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      Lịch sử
                    </button>
                  </>
                )}
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => { setView('admin'); setShowMobileMenu(false); }}
                    className={`px-4 py-2 text-left rounded-lg transition ${view === 'admin' ? 'bg-purple-100 text-purple-600' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    Quản lý
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Home View */}
        {view === 'home' && (
          <>
            {/* Search and Filters */}
            <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Tìm kiếm truyện theo tên hoặc tác giả..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                    } outline-none`}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    } outline-none`}
                  >
                    <option value="">Tất cả thể loại</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    } outline-none`}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="ongoing">Đang ra</option>
                    <option value="completed">Hoàn thành</option>
                  </select>

                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    } outline-none`}
                  >
                    <option value="all">Tất cả</option>
                    <option value="hot">🔥 Hot</option>
                    <option value="new">✨ Mới</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Comics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredComics.map(comic => (
                <div
                  key={comic.id}
                  onClick={() => openComicDetail(comic)}
                  className={`group cursor-pointer rounded-xl overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={comic.coverImage}
                      alt={comic.title}
                      className="w-full h-full object-cover transition group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {comic.isHot && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          🔥 HOT
                        </span>
                      )}
                      {comic.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                          ✨ MỚI
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(comic.id); }}
                        className={`p-2 rounded-full transition ${
                          darkMode ? 'bg-gray-900/70' : 'bg-white/70'
                        } hover:scale-110`}
                      >
                        <HeartIcon filled={favorites.includes(comic.id)} />
                      </button>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent`}>
                      <div className="flex items-center gap-2 text-white text-xs">
                        <span>👁 {formatNumber(comic.views)}</span>
                        <span>📖 {comic.chapters.length} ch</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className={`font-semibold text-sm line-clamp-2 mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {comic.title}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {comic.author}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(comic.rating)}
                      <span className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ({comic.ratingCount})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredComics.length === 0 && (
              <div className="text-center py-16">
                <span className="text-6xl">📭</span>
                <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Không tìm thấy truyện nào
                </p>
              </div>
            )}
          </>
        )}

        {/* Detail View */}
        {view === 'detail' && selectedComic && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setView('home')}
              className={`flex items-center gap-2 mb-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}
            >
              <ChevronLeftIcon />
              <span>Quay lại</span>
            </button>

            <div className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={selectedComic.coverImage}
                    alt={selectedComic.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedComic.isHot && (
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                        🔥 HOT
                      </span>
                    )}
                    {selectedComic.isNew && (
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                        ✨ MỚI
                      </span>
                    )}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedComic.status === 'ongoing' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedComic.status === 'ongoing' ? 'Đang ra' : 'Hoàn thành'}
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold mb-2">{selectedComic.title}</h1>
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tác giả: {selectedComic.author}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedComic.rating)}
                      <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedComic.rating.toFixed(1)} ({selectedComic.ratingCount} đánh giá)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm mb-4">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      👁 {formatNumber(selectedComic.views)} lượt xem
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      📖 {selectedComic.chapters.length} chương
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedComic.genres.map(genre => (
                      <span
                        key={genre}
                        className={`px-3 py-1 text-sm rounded-full ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedComic.description}
                  </p>

                  <div className="flex gap-3">
                    {selectedComic.chapters.length > 0 && (
                      <button
                        onClick={() => openReader(selectedComic, selectedComic.chapters[0])}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                      >
                        Đọc từ đầu
                      </button>
                    )}
                    <button
                      onClick={() => toggleFavorite(selectedComic.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                        favorites.includes(selectedComic.id)
                          ? 'bg-red-500 text-white'
                          : darkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <HeartIcon filled={favorites.includes(selectedComic.id)} />
                      {favorites.includes(selectedComic.id) ? 'Đã yêu thích' : 'Yêu thích'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Chapters List */}
              <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold mb-4">Danh sách chương</h2>
                <div className="grid gap-2 max-h-96 overflow-y-auto">
                  {[...selectedComic.chapters].reverse().map(chapter => (
                    <button
                      key={chapter.id}
                      onClick={() => openReader(selectedComic, chapter)}
                      className={`flex items-center justify-between p-3 rounded-lg text-left transition ${
                        darkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div>
                        <span className="font-medium">Chương {chapter.number}</span>
                        <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {chapter.title}
                        </span>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatDate(chapter.createdAt)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold mb-4">Bình luận ({comments[selectedComic.id]?.length || 0})</h2>
                
                {currentUser ? (
                  <div className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Viết bình luận của bạn..."
                      className={`w-full p-4 rounded-lg border resize-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                      } outline-none`}
                      rows={3}
                    />
                    <button
                      onClick={() => addComment(selectedComic.id, newComment)}
                      disabled={!newComment.trim()}
                      className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Gửi bình luận
                    </button>
                  </div>
                ) : (
                  <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <button onClick={() => setShowAuthModal(true)} className="text-purple-500 hover:underline">
                      Đăng nhập
                    </button> để bình luận
                  </p>
                )}

                <div className="space-y-4">
                  {(comments[selectedComic.id] || []).map(comment => (
                    <div key={comment.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{comment.username}</span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {comment.content}
                      </p>
                    </div>
                  ))}
                  
                  {(!comments[selectedComic.id] || comments[selectedComic.id].length === 0) && (
                    <p className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Chưa có bình luận nào. Hãy là người đầu tiên!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reader View */}
        {view === 'reader' && selectedComic && selectedChapter && (
          <div className="max-w-4xl mx-auto">
            <div className={`sticky top-16 z-40 -mx-4 px-4 py-3 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setView('detail')}
                  className={`flex items-center gap-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}
                >
                  <ChevronLeftIcon />
                  <span className="hidden sm:inline">Quay lại</span>
                </button>
                
                <div className="text-center">
                  <h2 className="font-bold">{selectedComic.title}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Chương {selectedChapter.number}: {selectedChapter.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedChapter.id}
                    onChange={(e) => {
                      const chapter = selectedComic.chapters.find(c => c.id === e.target.value);
                      if (chapter) {
                        setSelectedChapter(chapter);
                        addToHistory(selectedComic, chapter, 0);
                      }
                    }}
                    className={`px-3 py-1 rounded border text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-100 border-gray-200'
                    }`}
                  >
                    {selectedComic.chapters.map(ch => (
                      <option key={ch.id} value={ch.id}>
                        Ch. {ch.number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex justify-between mb-4">
              <button
                onClick={() => navigateChapter('prev')}
                disabled={selectedComic.chapters[0].id === selectedChapter.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ChevronLeftIcon />
                <span>Chương trước</span>
              </button>
              <button
                onClick={() => navigateChapter('next')}
                disabled={selectedComic.chapters[selectedComic.chapters.length - 1].id === selectedChapter.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <span>Chương sau</span>
                <ChevronRightIcon />
              </button>
            </div>

            {/* Pages */}
            <div className="space-y-2">
              {selectedChapter.pages.map((page, index) => (
                <img
                  key={index}
                  src={page}
                  alt={`Trang ${index + 1}`}
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between mt-6 mb-8">
              <button
                onClick={() => navigateChapter('prev')}
                disabled={selectedComic.chapters[0].id === selectedChapter.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ChevronLeftIcon />
                <span>Chương trước</span>
              </button>
              <button
                onClick={() => navigateChapter('next')}
                disabled={selectedComic.chapters[selectedComic.chapters.length - 1].id === selectedChapter.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <span>Chương sau</span>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}

        {/* Favorites View */}
        {view === 'favorites' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">❤️ Truyện yêu thích</h1>
            {favoriteComics.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {favoriteComics.map(comic => (
                  <div
                    key={comic.id}
                    onClick={() => openComicDetail(comic)}
                    className={`group cursor-pointer rounded-xl overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-xl ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={comic.coverImage}
                        alt={comic.title}
                        className="w-full h-full object-cover transition group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(comic.id); }}
                          className="p-2 rounded-full bg-red-500 text-white transition hover:scale-110"
                        >
                          <HeartIcon filled />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className={`font-semibold text-sm line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {comic.title}
                      </h3>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {comic.chapters.length} chương
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="text-6xl">💔</span>
                <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Chưa có truyện yêu thích
                </p>
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {view === 'history' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">📖 Lịch sử đọc truyện</h1>
            {userHistory.length > 0 ? (
              <div className={`rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {userHistory.map((item, index) => {
                  const comic = comics.find(c => c.id === item.comicId);
                  return (
                    <div
                      key={`${item.comicId}-${item.chapterId}`}
                      onClick={() => {
                        if (comic) {
                          const chapter = comic.chapters.find(ch => ch.id === item.chapterId);
                          if (chapter) openReader(comic, chapter);
                        }
                      }}
                      className={`flex items-center gap-4 p-4 cursor-pointer transition ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } ${index !== userHistory.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}
                    >
                      <img
                        src={comic?.coverImage || 'https://picsum.photos/seed/default/100/150'}
                        alt={item.comicTitle}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.comicTitle}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Đã đọc: Chương {item.chapterNumber}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {timeAgo(item.readAt)}
                        </p>
                      </div>
                      <ChevronRightIcon />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="text-6xl">📚</span>
                <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Chưa có lịch sử đọc
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ranking View */}
        {view === 'ranking' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">🏆 Bảng xếp hạng</h1>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Daily */}
              <div className={`rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <h2 className="text-lg font-bold">🔥 Top Ngày</h2>
                </div>
                <div className="p-4">
                  {getRankedComics('day').map((comic, index) => (
                    <div
                      key={comic.id}
                      onClick={() => openComicDetail(comic)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {index + 1}
                      </span>
                      <img src={comic.coverImage} alt={comic.title} className="w-10 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{comic.title}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          👁 {formatNumber(Math.floor(comic.views * 0.1))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly */}
              <div className={`rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <h2 className="text-lg font-bold">📊 Top Tuần</h2>
                </div>
                <div className="p-4">
                  {getRankedComics('week').map((comic, index) => (
                    <div
                      key={comic.id}
                      onClick={() => openComicDetail(comic)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {index + 1}
                      </span>
                      <img src={comic.coverImage} alt={comic.title} className="w-10 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{comic.title}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          👁 {formatNumber(Math.floor(comic.views * 0.5))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly */}
              <div className={`rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <h2 className="text-lg font-bold">🏅 Top Tháng</h2>
                </div>
                <div className="p-4">
                  {getRankedComics('month').map((comic, index) => (
                    <div
                      key={comic.id}
                      onClick={() => openComicDetail(comic)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {index + 1}
                      </span>
                      <img src={comic.coverImage} alt={comic.title} className="w-10 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{comic.title}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          👁 {formatNumber(comic.views)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin View */}
        {view === 'admin' && currentUser?.isAdmin && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">⚙️ Quản lý truyện</h1>
              <button
                onClick={() => { setEditingComic(null); setShowComicForm(true); }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                + Thêm truyện mới
              </button>
            </div>

            <div className={`rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Truyện</th>
                      <th className="px-4 py-3 text-left font-semibold">Tác giả</th>
                      <th className="px-4 py-3 text-left font-semibold">Trạng thái</th>
                      <th className="px-4 py-3 text-left font-semibold">Chương</th>
                      <th className="px-4 py-3 text-left font-semibold">Lượt xem</th>
                      <th className="px-4 py-3 text-left font-semibold">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comics.map((comic, index) => (
                      <tr key={comic.id} className={index !== comics.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={comic.coverImage} alt={comic.title} className="w-12 h-16 object-cover rounded" />
                            <div>
                              <p className="font-medium">{comic.title}</p>
                              <div className="flex gap-1 mt-1">
                                {comic.isHot && <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">HOT</span>}
                                {comic.isNew && <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">MỚI</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{comic.author}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            comic.status === 'ongoing' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {comic.status === 'ongoing' ? 'Đang ra' : 'Hoàn thành'}
                          </span>
                        </td>
                        <td className="px-4 py-3">{comic.chapters.length}</td>
                        <td className="px-4 py-3">{formatNumber(comic.views)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingComic(comic); setShowComicForm(true); }}
                              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteComic(comic.id)}
                              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`w-full max-w-md rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">
                {authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <CloseIcon />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const username = formData.get('username') as string;
                const password = formData.get('password') as string;
                
                if (authMode === 'login') {
                  handleLogin(username, password);
                } else {
                  handleRegister(username, password);
                }
              }}
              className="p-6"
            >
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                  } outline-none`}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                  } outline-none`}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                {authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
              <p className="mt-4 text-center">
                {authMode === 'login' ? (
                  <>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-purple-500 hover:underline"
                    >
                      Đăng ký
                    </button>
                  </>
                ) : (
                  <>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-purple-500 hover:underline"
                    >
                      Đăng nhập
                    </button>
                  </>
                )}
              </p>
              <p className={`mt-4 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Admin: admin / admin
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Comic Form Modal */}
      {showComicForm && currentUser?.isAdmin && (
        <ComicFormModal
          comic={editingComic}
          darkMode={darkMode}
          onSave={handleSaveComic}
          onClose={() => { setShowComicForm(false); setEditingComic(null); }}
          onChapterSave={(chapter) => handleSaveChapter(editingComic?.id || '', chapter)}
          onChapterDelete={(chapterId) => editingComic && handleDeleteChapter(editingComic.id, chapterId)}
        />
      )}
    </div>
  );
}

// Comic Form Modal Component
function ComicFormModal({
  comic,
  darkMode,
  onSave,
  onClose,
  onChapterSave,
  onChapterDelete
}: {
  comic: Comic | null;
  darkMode: boolean;
  onSave: (data: Partial<Comic>) => void;
  onClose: () => void;
  onChapterSave: (chapter: Partial<Chapter>) => void;
  onChapterDelete: (chapterId: string) => void;
}) {
  const [formData, setFormData] = useState({
    title: comic?.title || '',
    author: comic?.author || '',
    genres: comic?.genres || [],
    status: comic?.status || 'ongoing' as 'ongoing' | 'completed',
    coverImage: comic?.coverImage || '',
    description: comic?.description || '',
    isHot: comic?.isHot || false
  });
  
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterForm, setChapterForm] = useState({
    number: 1,
    title: '',
    pages: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChapterSave({
      id: editingChapter?.id,
      number: chapterForm.number,
      title: chapterForm.title,
      pages: chapterForm.pages.filter(p => p.trim())
    });
    setShowChapterForm(false);
    setEditingChapter(null);
    setChapterForm({ number: comic?.chapters.length ? comic.chapters.length + 1 : 1, title: '', pages: [''] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} my-8`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">
            {comic ? 'Chỉnh sửa truyện' : 'Thêm truyện mới'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tên truyện *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border transition ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                } outline-none`}
              />
            </div>
            
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tác giả *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-lg border transition ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                } outline-none`}
              />
            </div>
            
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Link ảnh bìa
              </label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 rounded-lg border transition ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                } outline-none`}
              />
            </div>
            
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Thể loại
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      const newGenres = formData.genres.includes(genre)
                        ? formData.genres.filter(g => g !== genre)
                        : [...formData.genres, genre];
                      setFormData({ ...formData, genres: newGenres });
                    }}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      formData.genres.includes(genre)
                        ? 'bg-purple-600 text-white'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mô tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border resize-none transition ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                } outline-none`}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ongoing' | 'completed' })}
                  className={`px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <option value="ongoing">Đang ra</option>
                  <option value="completed">Hoàn thành</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isHot}
                    onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                    className="w-5 h-5 rounded text-purple-600"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Đánh dấu HOT 🔥</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                {comic ? 'Cập nhật' : 'Thêm truyện'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Hủy
              </button>
            </div>
          </form>

          {/* Chapter Management (only for existing comics) */}
          {comic && (
            <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Quản lý chương ({comic.chapters.length})</h3>
                <button
                  type="button"
                  onClick={() => {
                    setEditingChapter(null);
                    setChapterForm({
                      number: comic.chapters.length + 1,
                      title: '',
                      pages: ['']
                    });
                    setShowChapterForm(true);
                  }}
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
                >
                  + Thêm chương
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {comic.chapters.map(chapter => (
                  <div
                    key={chapter.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <div>
                      <span className="font-medium">Chương {chapter.number}</span>
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {chapter.title}
                      </span>
                      <span className={`ml-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        ({chapter.pages.length} trang)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingChapter(chapter);
                          setChapterForm({
                            number: chapter.number,
                            title: chapter.title,
                            pages: chapter.pages.length > 0 ? chapter.pages : ['']
                          });
                          setShowChapterForm(true);
                        }}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => onChapterDelete(chapter.id)}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Form Modal */}
      {showChapterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`w-full max-w-lg rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">
                {editingChapter ? 'Chỉnh sửa chương' : 'Thêm chương mới'}
              </h2>
              <button
                onClick={() => setShowChapterForm(false)}
                className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <CloseIcon />
              </button>
            </div>
            
            <form onSubmit={handleChapterSubmit} className="p-6">
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Số chương *
                </label>
                <input
                  type="number"
                  value={chapterForm.number}
                  onChange={(e) => setChapterForm({ ...chapterForm, number: parseInt(e.target.value) || 1 })}
                  required
                  min={1}
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                  } outline-none`}
                />
              </div>
              
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tiêu đề chương
                </label>
                <input
                  type="text"
                  value={chapterForm.title}
                  onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                  placeholder={`Chương ${chapterForm.number}`}
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                      : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                  } outline-none`}
                />
              </div>
              
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Link ảnh các trang
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {chapterForm.pages.map((page, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={page}
                        onChange={(e) => {
                          const newPages = [...chapterForm.pages];
                          newPages[index] = e.target.value;
                          setChapterForm({ ...chapterForm, pages: newPages });
                        }}
                        placeholder={`Link ảnh trang ${index + 1}`}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm transition ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 focus:border-purple-500' 
                            : 'bg-gray-50 border-gray-200 focus:border-purple-500'
                        } outline-none`}
                      />
                      {chapterForm.pages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newPages = chapterForm.pages.filter((_, i) => i !== index);
                            setChapterForm({ ...chapterForm, pages: newPages });
                          }}
                          className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setChapterForm({ ...chapterForm, pages: [...chapterForm.pages, ''] })}
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                >
                  + Thêm trang
                </button>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                >
                  {editingChapter ? 'Cập nhật' : 'Thêm chương'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowChapterForm(false)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
