import React from 'react';
import './App.css';
import Layout from "./components/Layout";
import { Table as ApplicationsTable } from "./components/Table";

function App() {
    return (
        <Layout>
            <ApplicationsTable />
        </Layout>
    );
}

export default App;
