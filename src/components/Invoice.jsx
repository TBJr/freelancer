import React from 'react';
import Payment from './Payment';

const Invoice = ({ invoice }) => {
    return (
        <div>
            <h2>Invoice #{invoice.id}</h2>
            <p>Amount: ${invoice.amount}</p>
            <Payment amount={invoice.amount} />
        </div>
    );
};

export default Invoice;