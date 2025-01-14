import React from "react";

const PaginationButton = ({ totalPages, currentPage, handlePageChange }) => {
  return [...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`px-4 py-2 rounded ${
        currentPage === index + 1
          ? "bg-coffee-medium text-white hover:bg-coffee-creamLight"
          : "bg-coffee-creamLight text-black hover:bg-coffee-medium hover:text-white"
      }`}
    >
      {index + 1}
    </button>
  ));
};

export default PaginationButton;
