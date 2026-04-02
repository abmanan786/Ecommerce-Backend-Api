// ═══════════════════════════════════════════════════════════════════
// 📁 FILE: src/components/shop/Pagination.jsx
// 📌 PURPOSE: Page navigation component
// ═══════════════════════════════════════════════════════════════════

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/shopHelpers";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-10">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((pageNum, idx) =>
        pageNum === "..." ? (
          <span key={idx} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
              currentPage === pageNum
                ? "bg-black text-white"
                : "border hover:bg-gray-50",
            )}
          >
            {pageNum}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 border rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
