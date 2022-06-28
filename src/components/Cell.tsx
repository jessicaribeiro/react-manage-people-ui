import React from 'react';
import { css, cx } from "@emotion/css";

type CellProps = {
    children: React.ReactNode;
    className?: string;
}

export function Cell({ children, className }: CellProps) {
    return (
        <div className={cx(cellStyle, className)}>
            {children}
        </div>
    );
}

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
