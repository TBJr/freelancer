// netlify/functions/createInvoice.js
const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
    const { clientId, amount, description } = JSON.parse(event.body);

    try {
        const response = await client.query(
            q.Create(q.Collection('invoices'), {
                data: {
                    clientId,
                    amount,
                    description,
                    createdAt: new Date().toISOString(),
                },
            })
        );
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create invoice' }),
        };
    }
};