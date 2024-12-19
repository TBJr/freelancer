import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const Payment = ({ amount }) => {
    const handlePayment = async () => {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: 'your_test_price_id_here', quantity: 1 }],
            mode: 'payment',
            successUrl: window.location.origin + '/success',
            cancelUrl: window.location.origin + '/cancel',
        });
        if (error) {
            console.error('Payment error:', error);
        }
    };

    return <button onClick={handlePayment}>Pay ${amount}</button>;
};

export default Payment;