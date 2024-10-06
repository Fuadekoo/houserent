import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from './HouseCard';


const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property/active-rooms');
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
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex p-2 flex-wrap justify-center gap-6 overflow-y-auto h-96">
      {houses.map((house) => (
        <HouseCard key={house._id} house={house} />
      ))}
    </div>
  );
};

export default HousesList;