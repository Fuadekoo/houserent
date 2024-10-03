
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IsRoomBlockCard from './IsRoomBlockCard';
import Loading from '../../components/Loader';
const BlockedHouse = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property/blocked-rooms');
        if (response.data.success) {
          setHouses(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch houses');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    <Loading />
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
      {houses.map((house) => (
        <IsRoomBlockCard key={house._id} house={house} />
      ))}
    </div>
  );
};

export default BlockedHouse;