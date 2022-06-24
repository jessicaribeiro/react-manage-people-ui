import React from 'react';
import { css } from "@emotion/css";

type CellProps = {
    children: React.ReactNode;
}

function Cell({ children }: CellProps) {
    return (
        <div className={cellStyle}>
            {children}
        </div>
    );
}

export default Cell;

const cellStyle = css`
  width: 100%;
  border-right: 1px solid;

  &:last-child {
    border-right: none;
  }
`;
