
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Thanks = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    const urldata = Object.fromEntries(searchParams.entries());
    const status = urldata.status || 'N/A';
    const tx_ref = urldata['amp;tx_ref'] || 'N/A'; // Handle 'amp;tx_ref'
    const amount = urldata['amp;amount'] || 'N/A'; // Handle 'amp;amount'

    console.log('Status:', status);
    console.log('Transaction Reference:', tx_ref);
    console.log('Amount:', amount);

    if (!status || !tx_ref) {
      console.error('Required query parameters are missing');
      return;
    }

    if (status === 'success') {

      try {
         // Now you can update the user's balance
          axios
            .post('http://localhost:5000/api/transaction/addbalance',
               {tx_ref ,amount } , {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request header
            }
            } )
            .then((res) => {
              console.log('Balance updated successfully:', res.data);
              navigate('/'); // Redirect to user dashboard or any page
            })
      } catch (error) {
              console.error('Error updating balance:', error);
      }
    } else {
      navigate('/payment-fail');
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h1>Thank You for Your Payment</h1>
      <p>We are processing your payment...</p>
    </div>
  );
};

export default Thanks;

