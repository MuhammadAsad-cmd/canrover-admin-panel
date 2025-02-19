"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1, 2];

    if (currentPage > 3) {
      pages.push("...");
    }

    if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage);
    } else {
      pages.push(Math.floor(totalPages / 2));
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages - 1, totalPages);
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border border-border-default text-paragraph rounded-md hover:bg-primary-light hover:text-primary transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-paragraph"
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 min-w-[40px] rounded-md transition-colors
              ${
                currentPage === page
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "border border-border-default text-paragraph hover:bg-primary-light hover:text-primary"
              }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-paragraph">
            {page}
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border border-border-default text-paragraph rounded-md hover:bg-primary-light hover:text-primary transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-paragraph"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
