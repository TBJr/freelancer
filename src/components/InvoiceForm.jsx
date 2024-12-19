import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
    const [clientId, setClientId] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/.netlify/functions/createInvoice', { clientId, amount, description });

            // Reset form or show success message
            setClientId('');
            setAmount('');
            setDescription('');
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <button type="submit">Create Invoice</button>

        </form>
    );
};

export default InvoiceForm;