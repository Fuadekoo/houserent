import React, { useState } from 'react';
import axios from 'axios';

const WithdrawalForm = () => {
  const [amount, setAmount] = useState('');
  const [withdrawOption, setWithdrawOption] = useState('');
  const [withdrewAccount, setWithdrewAccount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
      const response = await axios.post(
        'http://localhost:5000/api/withdrawal',
        { amount, withdrawOption, withdrewAccount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdrawOption">
            Withdraw Option
          </label>
          <select
            id="withdrawOption"
            value={withdrawOption}
            onChange={(e) => setWithdrawOption(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select an option</option>
            <option value="CBE">CBE</option>
            <option value="TELEBIRR">TELEBIRR</option>
            <option value="AMOLE">AMOLE</option>
            <option value="ABYSINIA">ABYSINIA</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdrewAccount">
            Account Number
          </label>
          <input
            type="text"
            id="withdrewAccount"
            value={withdrewAccount}
            onChange={(e) => setWithdrewAccount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;