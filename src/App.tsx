import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from "./components/Layout";
import { Table as ApplicationsTable } from "./components/Table";
import ApplicationsAPI from "./api/factories/applications-api";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/css";
import { Candidate, SortKeys } from "./components/types";

const tableColumns: {label: string, key: SortKeys, sortable: boolean}[] = [
    { label: "Name", key: "name", sortable: false },
    { label: "Email", key: "email", sortable: false },
    { label: "Age", key: "birth_date", sortable: false },
    { label: "Years of Experience", key: "year_of_experience", sortable: true },
    { label: "Position applied", key: "position_applied", sortable: true },
    { label: "Applied", key: "application_date", sortable: true },
    { label: "Status", key: "status", sortable: false },
];

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
            <ApplicationsTable columns={tableColumns} candidates={candidates} />
        </Layout>
    );
}

export default App;


const loadingStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
