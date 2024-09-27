import React from 'react';
import Balance from '../pages/User/Balance';
import ChapaPayment from './User/ChapaPayment';
import DepositHistory from './DepositHistory';

function DepositDisplay() {
  return (
    <div>
      {/* <p>This is display my balance and add a balance to my account from chapa payments</p> */}
      <Balance />
      <ChapaPayment/>
      <DepositHistory />
    </div>
  );
}

export default DepositDisplay;
