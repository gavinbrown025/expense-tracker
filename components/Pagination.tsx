import { useEffect, useState } from "react";

export function usePagination(items: Array<unknown>, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(items.length / itemsPerPage)));
    setCurrentPage((prev) =>
      Math.min(prev, Math.max(1, Math.ceil(items.length / itemsPerPage)))
    );
  }, [items.length, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, items.length);

  const displayedItems = items.slice(startIndex, endIndex);

  const PageController = () => (
    <div className="join ">
      <button
        className="join-item btn btn-xs"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      >
        «
      </button>
      <button className="join-item btn btn-xs">Page {currentPage}</button>
      <button
        className="join-item btn btn-xs"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      >
        »
      </button>
    </div>
  );

  return { displayedItems, PageController };
}
