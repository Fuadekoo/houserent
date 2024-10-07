


import React from 'react';

const BookedUserCard = ({ image , user, email, phone, fromTime, toTime, totalDays, totalPayment }) => {
  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {/* Use a default avatar image or an image from user data */}
          <img
            className="w-10 h-10 rounded-full"
            src={image}
            alt={`${user} profile`}
          />
        </div>
        <div className="flex-1 min-w-150">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{user}</p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">{email}</p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">{phone}</p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {fromTime} - {toTime}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Total Days: {totalDays}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green">
          Total Payment: {totalPayment}ETB
        </div>
      </div>
    </div>
  );
};

export default BookedUserCard;
