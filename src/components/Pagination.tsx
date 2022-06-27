import React from 'react';
import { css, cx } from "@emotion/css";

type PaginationProps = {
    candidatesPerPage: number;
    totalCandidates: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
}

export function Pagination({ candidatesPerPage, totalCandidates, currentPage, handlePageChange }: PaginationProps) {
    const pageNumbers = [];
    const maxPage = Math.ceil(totalCandidates / candidatesPerPage);

    // Obtain the page numbers
    for( let i = 1; i <= maxPage; i++ ) {
        pageNumbers.push(i);
    }

    return (
        <div className={paginationRootStyle}>
            <ul className={paginationStyle}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            className={cx(buttonStyle, {
                                [buttonStyleSelected]: number === currentPage,
                            })}
                            onClick={() => handlePageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const paginationRootStyle = css`
  align-self: center;
  margin-top: 30px;
`;

const paginationStyle = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  align-self: center;
`;

const buttonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  color: grey;
  outline: 0;
  border: 0;
  border-radius: 16px;
  cursor: pointer;
  margin: 0 3px;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
  min-width: 32px;
  height: 32px;

  &:hover {
    background-color: rgba(144, 202, 249, 0.3);
  }
`;

const buttonStyleSelected = css`
  background-color: rgb(144, 202, 249);
  color: white;

  &:hover {
    background-color: rgb(110, 159, 196);
  }
`;
