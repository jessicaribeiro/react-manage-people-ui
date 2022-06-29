import React from 'react';
import { css } from "@emotion/css";
import { Candidate } from "../types/types";
import { Cell } from "./Cell";

type RowProps = {
    candidate: Candidate;
}

export function Row({ candidate }: RowProps) {
    return (
        <div className={rowStyle}>
            {Object.entries(candidate).map(([key, value]) => {

                // do not render "id" column
                if (key === "id") {
                    return null;
                }

                return (
                    <Cell key={key} columnId={key} value={value} />
                )
            })
            }
        </div>
    );
}

const rowStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 auto;
  border-bottom: 1px solid #eee;

  &:hover {
    background: lightgray;
  }
`;

