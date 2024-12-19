import { useState } from 'react'
import InvoiceForm from "./components/InvoiceForm.jsx";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./components/ClientList.jsx";
import './App.css'

function App() {
    return (
        <>
            <div>
                <h1>Freelancer CRM</h1>
                <InvoiceForm />
                <ClientForm />
                <ClientList />
            </div>
        </>
    )
}

export default App
