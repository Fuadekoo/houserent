import React from 'react';

function Pay({ fname, email, amount, tx_ref, public_key }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Deposit</h2>
        <p className="text-md mb-4">Amount: <span className="font-semibold">{amount}</span></p>
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
            Deposit Balance
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pay;
