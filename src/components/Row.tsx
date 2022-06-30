import React from 'react';
import { css } from "@emotion/css";
import { Candidate } from "../types/types";
import { Cell } from "./Cell";

type RowProps = {
    candidate: Candidate;
}

export function Row({ candidate }: RowProps) {
    return (
        <tr className={rowStyle}>
            {Object.entries(candidate).map(([key, value]) => {

                // do not render "id" column
                if (key === "id") {
                    return null;
                }

                return (
                    <Cell key={key} columnId={key} value={value} isHeader={false}/>
                )
            })
            }
        </tr>
    );
}

const rowStyle = css`
  border-bottom: 1px solid #eee;

  &:hover {
    background: lightgray;
  }
`;

