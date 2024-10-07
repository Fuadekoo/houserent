import React, { useEffect, useState } from 'react';

const MyWithdraw = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }

                const response = await fetch('http://localhost:5000/api/withdrawal/getSingleUserWithdrawals', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch withdrawals');
                }

                const data = await response.json();
                setWithdrawals(data);
            } catch (error) {
                console.error('Error fetching withdrawals:', error);
                setError(error.message);
            }
        };

        fetchWithdrawals();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (withdrawals.length === 0) {
        return <div>No withdrawals found.</div>;
    }

    return (
        <div className="mt-2 bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Withdrawal Details</h2>
                <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 border-b text-left text-gray-600">ID</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Withdrawal Amount</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Withdraw Option</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Withdrew Account</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Withdrew Status</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((withdrawal) => (
                                <tr key={withdrawal._id} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b">{withdrawal._id}</td>
                                    <td className="py-3 px-4 border-b">{withdrawal.withdrawalAmount}</td>
                                    <td className="py-3 px-4 border-b">{withdrawal.withdrawOption}</td>
                                    <td className="py-3 px-4 border-b">{withdrawal.withdrewAccount}</td>
                                    <td className="py-3 px-4 border-b">{withdrawal.withdrewStatus}</td>
                                    <td className="py-3 px-4 border-b">{new Date(withdrawal.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyWithdraw;