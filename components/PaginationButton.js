import React from "react";

const PaginationButton = ({ totalPages, currentPage, handlePageChange }) => {
  return [...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`w-9 h-9 flex items-center justify-center border-2 border-divider rounded-none text-[13px] font-semibold ${
        currentPage === index + 1
          ? "bg-accent text-bg"
          : "bg-surface text-ink hover:bg-accent-100"
      }`}
    >
      {index + 1}
    </button>
  ));
};

export default PaginationButton;
