import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number,
  ) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, countPages);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            if (currentPage === 1) {
              return;
            }

            onPageChange(e, currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => onPageChange(e, page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === countPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages}
          onClick={e => {
            if (currentPage === countPages) {
              return;
            }

            onPageChange(e, currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
