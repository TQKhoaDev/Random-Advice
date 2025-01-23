import './App.css';
import { useState, useEffect } from 'react';
import AdviceCard from './components/AdviceCard';
import FeelButtons from './components/Feel';
import Favorites from './components/Favorites';

function App() {
  const [advice, setAdvice] = useState('');
  const [liked, setLiked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [newAdvice, setNewAdvice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Mạng không ổn định');
      }
      const data = await response.json();
      const englishAdvice = data.slip.advice;

      if (!englishAdvice) {
        throw new Error('Lời khuyên không hợp lệ');
      }

      setAdvice(englishAdvice);
      setLiked(null);
      localStorage.setItem('advice', englishAdvice);
    } catch (error) {
      setError('Đã xảy ra lỗi khi lấy lời khuyên.');
    } finally {
      setLoading(false);
    }
  };
                                                                                
  useEffect(() => {
    const savedAdvice = localStorage.getItem('advice');
    if (savedAdvice) {
      setAdvice(savedAdvice);
    } else {
      fetchAdvice();
    }
  }, []);

  const handleLike = () => {
    setLiked(true);
    if (!favorites.includes(advice)) {
      const updatedFavorites = [...favorites, advice];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleDislike = () => setLiked(false);

  const handleShare = () => {
    const textToShare = advice;
    navigator.clipboard.writeText(textToShare)
      .then(() => {
        alert('Lời khuyên đã được sao chép! Bạn có thể dán vào Facebook.');
      })
      .catch(err => {
        console.error('Lỗi khi sao chép:', err);
        alert('Có lỗi xảy ra khi sao chép lời khuyên.');
      });
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('http://localhost:3000')}&quote=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank');
  };
// thêm
  const addNewFavorite = () => {
    if (newAdvice && !favorites.includes(newAdvice)) {
      const updatedFavorites = [...favorites, newAdvice];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setNewAdvice('');
    }
  };
// xóa
  const removeFavorite = (fav) => {
    const updatedFavorites = favorites.filter(item => item !== fav);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
// tìm
  const filteredFavorites = favorites.filter(fav =>
    fav.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const currentFavorites = filteredFavorites.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);

  return (
    <div className="App">
      <button onClick={toggleFavorites} className="toggle-favorites">
        {showFavorites ? 'Đóng Lời khuyên yêu thích' : 'Mở Lời khuyên yêu thích'}
      </button>

      {showFavorites && (
        <Favorites
          favorites={favorites}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          removeFavorite={removeFavorite}
          showInput={showInput}
          setShowInput={setShowInput}
          newAdvice={newAdvice}
          setNewAdvice={setNewAdvice}
          addNewFavorite={addNewFavorite}
          currentFavorites={currentFavorites}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <AdviceCard
        advice={advice}
        loading={loading}
        error={error}
        handleShare={handleShare}
      />
      <FeelButtons
        liked={liked}
        handleLike={handleLike}
        handleDislike={handleDislike}
        fetchAdvice={fetchAdvice}
        loading={loading}
      />
    </div>
  );
}

export default App;