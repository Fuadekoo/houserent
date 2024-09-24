import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Balance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/transaction/balance', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response); // Log the response to see its structure

        if (response.data.success) {
          setBalance(response.data.data.balance);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg animate-bounce">
      <h2 className="text-xl font-bold mb-2 text-center">My Balance</h2>
      <p className="text-center text-2xl text-green-500">{balance} ETB</p>
    </div>
  );
}

export default Balance;