import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const PaginationComponent = ({ path, paginationPages }) => {
  return (
    <div className="pagination">
      <div className="pagination-wrapper">
        {/* First page button */}
        {paginationPages.var1 > 1 && (
          <Link to={`${path}${paginationPages.first}`}>1</Link>
        )}

        {/* Previous page button */}
        <Link to={`${path}${paginationPages.prev}`}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>

        {/* variable 1 page button */}
        <Link
          to={`${path}${paginationPages.var1}`}
          style={{ color: 'white', backgroundColor: 'black' }}
        >
          {paginationPages.var1}
        </Link>

        {/* variable 2 page button */}
        {paginationPages.var2 && (
          <Link to={`${path}${paginationPages.var2}`}>
            {paginationPages.var2}
          </Link>
        )}

        {/* variable 3 page button */}
        {paginationPages.var3 && (
          <Link to={`${path}${paginationPages.var3}`}>
            {paginationPages.var3}
          </Link>
        )}

        {/* Next page button */}
        {paginationPages.var3 && (
          <Link to={`${path}${paginationPages.next}`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}

        {/* Last page button */}
        <Link to={`${path}${paginationPages.last}`}>
          {paginationPages.last}
        </Link>
      </div>
    </div>
  );
};

export default PaginationComponent;
