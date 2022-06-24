import React from 'react';
import { css, cx } from "@emotion/css";

type RowProps = {
    children: React.ReactNode;
    className?: string;
}

function Row({ children, className }: RowProps) {
    return (
        <div className={cx(rowStyle, className)}>
            {children}
        </div>
    );
}

export default Row;

const rowStyle = css`
  display: flex;
  flex-direction: row;
`;
