import React from 'react';

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const maxPageNumbersToShow = 3; 

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  return (
    <nav className="flex justify-center items-center gap-1.5 text-sm">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-1.5 py-0.5 ml-0 leading-tight border border-gray-300 rounded-full "
        >
          &laquo;
        </button>
      )}
      <ul className="inline-flex -space-x-px gap-1.5">
        {totalPages <= maxPageNumbersToShow ? (
          pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#!"
                className={`px-3 py-2 leading-tight  dark:bg-grayblack border border-gray-300 rounded-lg ${
                  number === currentPage ? ' ' : ''
                }`}
              >
                {number}
              </a>
            </li>
          ))
        ) : (
          <>
            {startPage > 1 && (
              <li className="page-item">
                <a
                  onClick={() => paginate(1)}
                  href="#!"
                  className="px-3 py-2 leading-tight  dark:bg-grayblack border border-gray-300 rounded-lg "
                >
                  1
                </a>
              </li>
            )}
            {startPage > 2 && (
              <li className="page-item">
                <span className="px-3 py-2 leading-tight  dark:bg-grayblack border border-gray-300 rounded-lg">
                  ...
                </span>
              </li>
            )}
            {pageNumbers.slice(startPage - 1, endPage).map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => paginate(number)}
                  href="#!"
                  className={`px-3 py-2 leading-tight dark:bg-grayblack border border-gray-300 rounded-lg  ${
                    number === currentPage ? ' bg-slate-200 ' : ''
                  }`}
                >
                  {number}
                </a>
              </li>
            ))}
            {endPage < totalPages - 1 && (
              <li className="page-item">
                <span className="px-3 py-2 leading-tight  dark:bg-grayblack border border-gray-300 rounded-lg">
                  ...
                </span>
              </li>
            )}
            {endPage < totalPages && (
              <li className="page-item">
                <a
                  onClick={() => paginate(totalPages)}
                  href="#!"
                  className="px-3 py-2 leading-tight dark:bg-grayblack border border-gray-300 rounded-lg "
                >
                  {totalPages}
                </a>
              </li>
            )}
          </>
        )}
      </ul>
      {currentPage < totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-1.5 py-0.5 ml-0 leading-tight border border-gray-300 rounded-full "
        >
          &raquo;
        </button>
      )}
    </nav>
  );
};

export default Pagination;
