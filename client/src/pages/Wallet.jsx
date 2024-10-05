import React from 'react';
import Balance from '../pages/User/Balance';
import TransactionHistory from '../pages/User/TransactionHistory';
import ChapaPayment from './User/ChapaPayment';

function Wallet() {
  return (
    <div>
      <Balance />
      <ChapaPayment/>
      <TransactionHistory />
    </div>
  );
}

export default Wallet;
