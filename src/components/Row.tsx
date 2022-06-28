import React from 'react';
import { css } from "@emotion/css";
import { Candidate } from "../types/types";
import { Cell } from "./Cell";
import moment from "moment";

type RowProps = {
    candidate: Candidate;
}

export function Row({ candidate }: RowProps) {
    return (
        <div className={rowStyle}>
            {Object.entries(candidate).map(([key, value]) => {
                if (key === "id") {
                    return null;
                }

                // Convert date given to years using moment
                if (key === "birth_date") {
                    const years = moment().diff(value, 'years',false);
                    return <Cell key={key}>{years}</Cell>
                }

                // Format date to day/month/year
                if (key === "application_date") {
                    const date = moment(value).format('DD/MM/YYYY');
                    return <Cell key={key}>{date}</Cell>
                }

                if (key === "status") {
                    return <Cell className={capitalizeStyle} key={key}>{value}</Cell>
                }

                return (
                    <Cell key={key}>{value}</Cell>
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

const capitalizeStyle = css`
  text-transform: capitalize;
`;
