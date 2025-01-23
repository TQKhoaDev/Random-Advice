import React from 'react';

function FeelButtons({ liked, handleLike, handleDislike, fetchAdvice, loading }) {
  return (
    <div className="button-group">
      <button className={liked === true ? 'liked' : ''} onClick={handleLike}>
        <i className="fas fa-heart"></i>
      </button>
      <button onClick={fetchAdvice} disabled={loading}>
        <i className="fas fa-dice"></i>
      </button>
      <button className={liked === false ? 'disliked' : ''} onClick={handleDislike}>
        <i className="fas fa-thumbs-down"></i>
      </button>
    </div>
  );
}

export default FeelButtons;