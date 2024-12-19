import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/.netlify/functions/getInvoices'); // Adjust the endpoint as needed
                setInvoices(response.data);
            } catch (err) {
                setError('Failed to fetch invoices. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Invoice List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Client Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.clientName}</td>
                            <td>${(invoice.amount / 100).toFixed(2)}</td> {/* Assuming amount is in cents */}
                            <td>{invoice.status}</td>
                            <td>
                                <button onClick={() => handleViewInvoice(invoice.id)}>View</button>
                                <button onClick={() => handleSendInvoice(invoice.id)}>Send</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    function handleViewInvoice(invoiceId) {
        // Logic to view the invoice details, e.g., redirect to an invoice detail page
        console.log(`Viewing invoice: ${invoiceId}`);
    }

    function handleSendInvoice(invoiceId) {
        // Logic to send the invoice via email or another method
        console.log(`Sending invoice: ${invoiceId}`);
    }
};

export default InvoiceList;