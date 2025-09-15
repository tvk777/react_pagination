/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: number,
  ) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const end = currentPage * perPage;
  const start = end - perPage;

  const currentItems = items.slice(start, end);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {start + 1} -{' '}
        {end < TOTAL_ITEMS ? end : TOTAL_ITEMS} of {TOTAL_ITEMS})
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
            defaultValue={5}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
