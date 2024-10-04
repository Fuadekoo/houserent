import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const Cash = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWithdrawalId, setSelectedWithdrawalId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const withdrawalsPerPage = 5;

  // Fetch withdrawals from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/withdrawal/getWithdrawals')
      .then(response => {
        setWithdrawals(response.data);
        setFilteredWithdrawals(response.data);
      })
      .catch(error => {
        console.error('Error fetching withdrawals:', error);
      });
  }, []);

  // Update the withdrawal status
  const updateWithdrawalStatus = (id) => {
    axios.put(`http://localhost:5000/api/withdrawal/toggleBlockWithdrawal/${id}/block`, {
      withdrewStatus: newStatus
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      alert(response.data.message);
      setWithdrawals(prev => prev.map(w => 
        w._id === id ? { ...w, withdrewStatus: newStatus } : w
      ));
      setFilteredWithdrawals(prev => prev.map(w => 
        w._id === id ? { ...w, withdrewStatus: newStatus } : w
      ));
    })
    .catch(error => {
      console.error('Error updating withdrawal:', error);
    });
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredWithdrawals(withdrawals.filter(withdrawal =>
      withdrawal.ownerUser.includes(e.target.value) ||
      withdrawal.withdrawOption.includes(e.target.value) ||
      withdrawal.withdrewAccount.toString().includes(e.target.value)
    ));
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Pagination logic
  const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
  const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
  const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);
  const totalPages = Math.ceil(filteredWithdrawals.length / withdrawalsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Withdrawal Requests
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage withdrawal approvals
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
              <input 
                value={searchTerm} 
                onChange={handleSearch} 
                type='text' 
                placeholder='Search...' 
                className='bg-transparent focus:outline-none w-24 sm:w-64' 
              />
              <button type="submit">
                <FaSearch className='text-slate-600' />
              </button>
            </form>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Transaction ID</th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">User Info</th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Amount</th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Option</th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Account</th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Status</th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWithdrawals.map(withdrawal => (
              <tr key={withdrawal._id}>
                <td className="p-4 border-b border-blue-gray-50">{withdrawal._id}</td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div>
                    <p>Name: {withdrawal.ownerUser.name}</p>
                    <p>Email: {withdrawal.ownerUser.email}</p>
                    <p>Phone: {withdrawal.ownerUser.phone}</p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">{withdrawal.withdrawalAmount}</td>
                <td className="p-4 border-b border-blue-gray-50">{withdrawal.withdrawOption}</td>
                <td className="p-4 border-b border-blue-gray-50">{withdrawal.withdrewAccount}</td>
                <td className="p-4 border-b border-blue-gray-50">{withdrawal.withdrewStatus}</td>
                <td className="p-4 border-b border-blue-gray-50">
                  <select
                    value={selectedWithdrawalId === withdrawal._id ? newStatus : ''}
                    onChange={(e) => {
                      setSelectedWithdrawalId(withdrawal._id);
                      setNewStatus(e.target.value);
                    }}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                  </select>
                  <button
                    onClick={() => updateWithdrawalStatus(withdrawal._id)}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cash;