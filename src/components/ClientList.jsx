import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClients = async () => {

            try {
                const response = await axios.get('/.netlify/functions/getClients');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('Failed to load clients.');
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading) return <p>Loading clients...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <ul>
            {clients.map(client => (
                <li key={client.id}>{client.name} - {client.email}</li>
            ))}
        </ul>
    );
};

export default ClientList;