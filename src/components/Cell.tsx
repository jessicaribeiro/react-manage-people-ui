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
  display: flex;
  height: 46px;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 1 1 40%;
`;
