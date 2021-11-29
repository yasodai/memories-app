import useStore from "@/app/store";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Pagination({ page }) {
  const getPosts = useStore((state) => state.getPosts);

  const numberOfPages = useStore((state) => state.posts.numberOfPages);
  const [currentPage, setCurrentPage] = useState(Number(page));
  let maxPages = numberOfPages;
  let items = [];
  let leftSide = currentPage - 1;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 1;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <Link
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        key={number}
        onClick={() => setCurrentPage(number)}
        to={`?page=${number}`}
      >
        {number}
      </Link>
    );
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    getPosts(page);
  }, [page]);
  return (
    <div className="paginate mb-3 w-full">
      <Link
        className="round-effect"
        onClick={prevPage}
        to={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
      >
        {"<"}
      </Link>
      {items}
      <Link
        className="round-effect"
        onClick={nextPage}
        to={`?page=${currentPage < maxPages ? currentPage + 1 : maxPages}`}
      >
        {">"}
      </Link>
    </div>
  );
}
