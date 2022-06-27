import React from 'react';
import { css } from "@emotion/css";

type TableHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

export function TableHeader({ children }: TableHeaderProps) {
    return (
        <div className={tableHeaderStyle}>
            <div className={tableHeaderRowStyle}>
                <div className={tableHeaderRowCellStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const tableHeaderStyle = css`
  display: flex;
  flex: 0 0 auto;
  height: 46px;
  color: black;
  border-bottom: 1px solid #ccc;
  padding: 0 5px;
  font-size: 12px;
`;

const tableHeaderRowStyle = css`
  display: flex;
  flex: 1 1 auto;
  text-transform: uppercase;
  align-items: center;
  justify-content: space-between;
`;

const tableHeaderRowCellStyle = css`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  flex: 1 1 40%;
`;
