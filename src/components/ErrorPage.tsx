import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { css } from "@emotion/css";

export function ErrorPage() {
    return (
        <div className={errorStyle}>
            <ErrorOutlineIcon className={iconStyle} />
            <div className={titleStyle}>
                Something went wrong
                <SentimentVeryDissatisfiedIcon fontSize="small"/>
            </div>
            <p>This page could not be loaded. Please try again.</p>
            <button className={buttonStyle} onClick={() => window.location.reload()}>Try again</button>
        </div>
    );
}

const errorStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: rgb(110, 159, 196);
  border-color: rgb(110, 159, 196);
  border-radius: 5px;
  color: white;
  width: 100px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;

`;

const iconStyle = css`
  color: rgb(110, 159, 196);
  margin-bottom: 10px;
  height: 90px !important;
  width: 90px !important;
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  font-weight: bold;
  gap: 5px;
`;

