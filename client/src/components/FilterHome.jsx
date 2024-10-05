import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HouseCard from '../pages/HouseCard';

const FilterHome = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('apartama'); // Default category

  // Function to fetch houses based on category
  const fetchHouses = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/property/filter-${category}`);
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

  // Fetch houses whenever the selectedCategory changes
  useEffect(() => {
    fetchHouses(selectedCategory);
  }, [selectedCategory]);

  // Button click handler to change category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  if(houses.length === 0){
    return<div> <p>there is no current house</p></div>
  }
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }


  return (
    <div>
      {/* Buttons to select the category */}
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={() => handleCategoryChange('apartama')}
          className={`px-4 py-2 ${selectedCategory === 'apartama' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Apartama
        </button>    
        <button
          onClick={() => handleCategoryChange('villa')}
          className={`px-4 py-2 ${selectedCategory === 'villa' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Villa
        </button>
        <button
          onClick={() => handleCategoryChange('condominium')}
          className={`px-4 py-2 ${selectedCategory === 'condominium' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Condominium
        </button>
        <button
          onClick={() => handleCategoryChange('compound-house')}
          className={`px-4 py-2 ${selectedCategory === 'compound-house' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Compound House
        </button>
        <button
          onClick={() => handleCategoryChange('single-house')}
          className={`px-4 py-2 ${selectedCategory === 'single-house' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Single House
        </button>
      </div>

      {/* Display houses */}
      <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-96">
        {houses.length > 0 ? (
          houses.map((house) => <HouseCard key={house._id} house={house} />)
        ) : (
          <div className="text-center">No houses found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default FilterHome;
