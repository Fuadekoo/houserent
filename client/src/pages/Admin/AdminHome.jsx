
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IsRoomBlockCard from './IsRoomBlockCard';
import Loading from "../../components/Loader";
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { useDispatch} from 'react-redux';

const AdminHome = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get('http://localhost:5000/api/property/active-rooms');
        
        if (response.data.success) {
          setHouses(response.data.data);
          dispatch(HideLoading());
        } else {
          setError(response.data.message);
          dispatch(HideLoading());
        }
      } catch (err) {
        setError('Failed to fetch houses');
        dispatch(HideLoading());
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    <Loading/>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96" style={{height:"700px"}}>
      {houses.map((house) => (
        <IsRoomBlockCard key={house._id} house={house} />
      ))}
    </div>
  );
};
export default AdminHome;