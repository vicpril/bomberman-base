import './styles.css';
import React, { FC, MouseEventHandler, useState } from 'react';
import classNames from 'classnames';

export type TPaginatorProps = {
  pagesCount: number
  currentPage: number
  pageChanger: (pageNumber: number) => void
}

const range = (start = 1, count = 10) => Array(count).fill(0).map((_, index) => start + index);

export const Paginator: FC<TPaginatorProps> = ({ pagesCount, currentPage, pageChanger }) => {
  const items = range(1, pagesCount);
  const [page, setPage] = useState(currentPage);

  const clickHandler: MouseEventHandler = (event) => {
    const target = event.target as HTMLElement;
    if (target.textContent) {
      const pageNumber = parseInt(target.textContent, 10);
      pageChanger(pageNumber);
      setPage(pageNumber);
    }
  };

  return (
    <nav className={classNames(['paginator'])}>
      <div className={classNames(['paginator__list'])}>
        {items.map((number) => (
          <button
            className={classNames([
              'paginator__item',
              number === page && 'paginator__item_active',
            ])}
            onClick={clickHandler}
            key={number}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
};
