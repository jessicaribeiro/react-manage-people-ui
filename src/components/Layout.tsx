import React from 'react';
import { css } from "@emotion/css";
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from "@mui/material";

type LayoutProps = {
    children: React.ReactNode;
    isLoading: boolean;
}

export function Layout({ children, isLoading }: LayoutProps) {

    const renderLoading = () => {
        return (
            <div className={loadingStyle}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={layoutStyle}>
            <div className={layoutHeaderStyle}>
                <PersonIcon className={iconStyle} />
                <span className={titleStyle}>Applications</span>
            </div>
            {isLoading ? renderLoading() : children}
        </div>
    );
}


const layoutStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 30px;
`;

const layoutHeaderStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const iconStyle = css`
  margin-right: 5px;
`;

const titleStyle = css`
  font-weight: bold;
`;

const loadingStyle = css`
  align-self: center;
  margin-top: 60px;
  width: 90px;
`;

