import React, { useState } from 'react';
import axios from 'axios';


const ClientForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !phone) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post('/.netlify/functions/createClient', { name, email, phone });

            // Reset form
            setName('');
            setEmail('');
            setPhone('');
        } catch (error) {
            console.error('Error creating client:', error);
            setError('Failed to create client. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <button type="submit">Add Client</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default ClientForm;