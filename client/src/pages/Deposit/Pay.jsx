import React from 'react';
import {useSelector } from 'react-redux';

function Pay({ fname, email, amount, tx_ref, public_key }) {
  const { user } = useSelector(state => state.users);
  //min-h-screen
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100" style={{height:"300px", width:"80%"}}>
      <div className="bg-white p-3 rounded-lg shadow-md w-full max-w-md Z-50" style={{height:"300px", width:"80%", padding:"10px"}}>
        <h2 className="text-2xl font-bold mb-1">Deposit</h2>
        <p className="text-lg mb-1">New Amount: <span className="font-semibold">{amount}</span></p>
        <p className="text-lg mb-1">Current Balance: <span className="font-semibold">{user.balance}ETB</span></p>
        <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
          <input type="hidden" name="public_key" value={public_key} />
          <input type="hidden" name="tx_ref" value={tx_ref} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="currency" value="ETB" />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="first_name" value={fname} />
          <input type="hidden" name="title" value="Let us do this" />
          <input type="hidden" name="description" value="Paying with Confidence with cha" />
          <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
          <input type="hidden" name="callback_url" value="http://localhost:5000/api/transaction/addbalance" />
          <input type="hidden" name="return_url" value={`http://localhost:3000/thanks?status=success&tx_ref=${tx_ref}&amount=${amount}`} />
          <input type="hidden" name="meta[title]" value="test" />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            deposit balance 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
