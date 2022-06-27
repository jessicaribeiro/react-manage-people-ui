import React from 'react';
import { css } from "@emotion/css";
import Cell from "./Cell";
import { Candidate } from "./types";

type RowProps = {
    candidate: Candidate;
}

function Row({ candidate }: RowProps) {
    return (
        <div className={rowStyle}>
            {Object.entries(candidate).map(([key, value]) => {
                if (key === "id") {
                    return null;
                }

                return (
                    <Cell key={key}>{value}</Cell>
                )
            })
            }
        </div>
    );
}

export default Row;

const rowStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 auto;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: lightgray;
  }
`;
