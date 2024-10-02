import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [countusers, setCountUsers] = useState(0);
  const [countproducts, setCountProducts] = useState(0);
  const [countdeposit, setCountDeposit] = useState(0);
  const [countwithdraw, setCountWithdraw] = useState(0);
  const [countboking, setCountBoking] = useState(0);
  const [depositData, setDepositData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setCountUsers(data);
      // setCountUsers(data.length);

      const houseResponse = await fetch('http://localhost:5000/api/property');
      const houseData = await houseResponse.json();
      setCountProducts(houseData.length);

      const depositResponse = await fetch('http://localhost:5000/api/deposit');
      const depositData = await depositResponse.json();
      setCountDeposit(depositData.length);
      setDepositData(depositData);

      const withdrawResponse = await fetch('http://localhost:5000/api/withdraw');
      const withdrawData = await withdrawResponse.json();
      setCountWithdraw(withdrawData.length);

      const bookingResponse = await fetch('http://localhost:5000/api/booking');
      const bookingData = await bookingResponse.json();
      setCountBoking(bookingData.length);
    };
    fetchData();
  }, []);

  const barData = {
    labels: ['Users', 'Products', 'Deposits', 'Withdraws', 'Bookings'],
    datasets: [
      {
        label: '# of Items',
        data: [countusers, countproducts, countdeposit, countwithdraw, countboking],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: depositData.map((item, index) => `Deposit ${index + 1}`),
    datasets: [
      {
        data: depositData.map(item => item.amount), // Assuming each deposit item has an 'amount' field
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutBounce',
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '50%', height: '300px' }}>
        <Bar data={barData} options={options} />
      </div>
      <div style={{ width: '25%', height: '300px' }}>
        <Pie data={pieData} />
      </div>
      <div style={{ width: '25%', height: '300px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {depositData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;