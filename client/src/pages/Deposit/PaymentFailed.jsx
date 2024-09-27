import React from 'react';

function PaymentFailed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <img 
        src="https://example.com/failed-logo.png" 
        alt="Payment Failed" 
        className="w-24 h-24 mb-4 animate-bounce"
      />
      <h2 className="text-2xl font-bold text-red-600 animate-pulse">
        Payment Failed
      </h2>
      <p className="text-lg text-gray-700 mt-2">
        Please try again.
      </p>
    </div>
  );
}

export default PaymentFailed;
