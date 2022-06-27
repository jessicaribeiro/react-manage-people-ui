import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from "./components/Layout";
import { Table as ApplicationsTable } from "./components/Table";
import ApplicationsAPI from "./api/factories/applications-api";
import { Candidate } from "./api/types";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/css";

function App() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);

            const response = await ApplicationsAPI.getAllCandidates();
            let data = response.data;
            setCandidates(data);

            setIsLoading(false);
        };

        fetchCandidates();
    }, []);


    if (isLoading) {
        return (
            <div className={loadingStyle}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Layout>
            <ApplicationsTable candidates={candidates} />
        </Layout>
    );
}

export default App;


const loadingStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
