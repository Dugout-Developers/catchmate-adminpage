import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPageChange,
}) => {
  const maxVisiblePages = 5;

  if (totalPages < 1) return null; // ✅ totalPages가 0이면 페이지네이션 숨기기

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // ✅ 페이지 개수가 5개 미만이라면, startPage를 조정
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // ✅ totalPages가 5 이하일 경우 모든 페이지를 보여줌
  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className={`page-btn ${isFirst ? 'disabled' : ''}`}
        disabled={isFirst}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`page-btn ${isLast ? 'disabled' : ''}`}
        disabled={isLast}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
