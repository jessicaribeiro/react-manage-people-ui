import React from 'react';
import { css } from "@emotion/css";
import Row from "./Row";
import Cell from "./Cell";

export function Table() {

    const renderHeaderRow = () => {
        return (
            <Row className={tableHeader}>
                <Cell>Name</Cell>
                <Cell>Email</Cell>
                <Cell>Age</Cell>
                <Cell>Years of Experience</Cell>
                <Cell>Position applied</Cell>
                <Cell>Applied</Cell>
                <Cell>Status</Cell>
            </Row>
        )
    }

    return (
        <div className={flexTableStyle}>
            {renderHeaderRow()}
            <Row>
                <Cell>name</Cell>
                <Cell>name@email</Cell>
                <Cell>20</Cell>
                <Cell>1</Cell>
                <Cell>developer</Cell>
                <Cell>01/01/2022</Cell>
                <Cell>approved</Cell>
            </Row>
        </div>
    );
}


const flexTableStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 100%;
`;

const tableHeader = css`
    border-bottom: 1px solid;
`;
