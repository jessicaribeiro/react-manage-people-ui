import React from 'react';
import { css } from "@emotion/css";
import PersonIcon from '@mui/icons-material/Person';

type LayoutProps = {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={layoutStyle}>
            <div className={layoutHeaderStyle}>
                <PersonIcon className={iconStyle} />
                <span className={titleStyle}>Applications</span>
            </div>
            {children}
        </div>
    );
}

const layoutStyle = css`
  display: block;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
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

