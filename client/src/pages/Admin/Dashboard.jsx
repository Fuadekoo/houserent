import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { useDispatch} from 'react-redux';
import { json } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const token = localStorage.getItem('token'); // Adjust the token retrieval method as necessary
        const response = await axios.get('http://localhost:5000/api/dashboard/counts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        return json({ message: error.message });
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  const cards = [
    { title: 'Users', count: data.userCount },
    { title: 'Houses', count: data.houseCount },
    { title: 'Bookings', count: data.bookingCount },
    { title: 'Transactions', count: data.transactionCount },
    { title: 'Deposits', count: data.depositCount },
    { title: 'Withdrawals', count: data.withdrawalCount },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-3xl">{card.count}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;