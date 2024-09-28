import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named import

function ChapaPayment() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch the user role from the token
    const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role; // Adjust based on your token structure
      setUserRole(role);
    }
  }, []);

  return (
    <div>
      <button className='inline-block rounded bg-success px-8 pb-3 pt-3 mr-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]'>
        <Link to='/paynow'>Deposit</Link>
      </button>

      <button className='inline-block rounded bg-warning px-8 pb-3 pt-3 mr-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]'>
        <Link to='/mydeposit'>Show Deposit</Link>
      </button>
      console.log(userRole);

      {userRole === 'landloard' && (
        <button className='inline-block rounded bg-danger px-8 pb-3 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e3342f] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.3),0_4px_18px_0_rgba(227,52,47,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.3),0_4px_18px_0_rgba(227,52,47,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.3),0_4px_18px_0_rgba(227,52,47,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(227,52,47,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.2),0_4px_18px_0_rgba(227,52,47,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.2),0_4px_18px_0_rgba(227,52,47,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(227,52,47,0.2),0_4px_18px_0_rgba(227,52,47,0.1)]'>
          Withdraw
        </button>
      )}
    </div>
  );
}

export default ChapaPayment;