import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from "./components/Layout";
import { Table as ApplicationsTable } from "./components/Table";
import ApplicationsAPI from "./api/factories/applications-api";
import { Candidate } from "./api/types";

function App() {
    const [applications, setApplications] = useState<Candidate[] | null>([]);

    useEffect(() =>{
        const getApplications = async () => {
            let response = await ApplicationsAPI.getAll();
            let data = response.data;
            setApplications(data);
        };

        getApplications();
    }, []);

    return (
        <Layout>
            <ApplicationsTable />
        </Layout>
    );
}

export default App;
