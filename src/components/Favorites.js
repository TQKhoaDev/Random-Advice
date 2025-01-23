import React from 'react';

function Favorites({
  favorites,
  searchTerm,
  setSearchTerm,
  removeFavorite,
  showInput,
  setShowInput,
  newAdvice,
  setNewAdvice,
  addNewFavorite,
  currentFavorites,
  currentPage,
  totalPages,
  setCurrentPage
}) {
  return (
    <div className="favorites">
      <h2>Lời khuyên yêu thích</h2>
      <button className="add-favorite" onClick={() => setShowInput(!showInput)}>
        <i className="fas fa-plus"></i>
      </button>
      {showInput && (
        <div className="input-group">
          <input
            type="text"
            value={newAdvice}
            onChange={(e) => setNewAdvice(e.target.value)}
            placeholder="Thêm lời khuyên"
          />
          <button className="btn_add" onClick={addNewFavorite}>Thêm</button>
        </div>
      )}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm lời khuyên"
      />
      <ul>
        {currentFavorites.map((fav, index) => (
          <li key={index}>
            {fav}
            <button onClick={() => removeFavorite(fav)}>Xóa</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
        )}
      </div>
    </div>
  );
}

export default Favorites;