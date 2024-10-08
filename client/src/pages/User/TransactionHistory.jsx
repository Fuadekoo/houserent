import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loader';
import { useTranslation } from 'react-i18next';

function TransactionHistory() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const response = await axios.get('http://localhost:5000/api/transaction/get-all-transactions-by-user', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { userId }
        });

        if (response.data.success) {
          setTransactions(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('tenant.transactionhistory.transaction')}</h2>
        <div className="overflow-auto mb-1" style={{height:"500px"}}>
          <table className="min-w-full bg-white border border-gray-200">
            {/* <thead className='overflow-none' > */}
              <thead className="bg-gray-200 sticky top-0 z-10">
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-left text-gray-600">{t('tenant.transactionhistory.date')}</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">{t('tenant.transactionhistory.amount')}</th>
                <th className="py-3 px-4 border-b text-left text-gray-600">{t('tenant.transactionhistory.type')}</th>
              </tr>
            </thead>
            {/* <tbody className=''> */}
             <tbody className="overflow-y-scroll"> 
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b">{new Date(transaction.date).toLocaleString()}</td>
                  <td className="py-3 px-4 border-b">{transaction.amount.toFixed(2)} {t('tenant.transactionhistory.ETB')}</td>
                  <td className="py-3 px-4 border-b">{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
