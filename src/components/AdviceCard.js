import React from 'react';

function AdviceCard({ advice, loading, error, handleShare }) {
  return (
    <div className="card">
      <h1>Lời khuyên</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p>{advice}</p>
      )}
      <button className="share-button" onClick={handleShare} disabled={loading}>
        <i className="fas fa-share"></i> Chia sẻ
      </button>
    </div>
  );
}

export default AdviceCard;