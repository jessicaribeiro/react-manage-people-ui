import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from "./components/Layout";
import { Table as ApplicationsTable } from "./components/Table";
import ApplicationsAPI from "./api/factories/applications-api";
import { Candidate } from "./api/types";

function App() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getApplications = async () => {
            setIsLoading(true);

            let response = await ApplicationsAPI.getAll();
            let data = response.data;
            setCandidates(data);

            setIsLoading(false);
        };

        getApplications();
    }, []);

    return (
        <Layout>
            <ApplicationsTable candidates={candidates} isLoading={isLoading} />
        </Layout>
    );
}

export default App;
