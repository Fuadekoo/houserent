import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HouseCard from './HouseCard';
export default function SearchAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    housecategory: 'all',
    parking: false
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const fetchHouses = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:5000/api/property/activesearch?${searchQuery}`);
      const data = await res.json();
      
      if (data.success && data.data.length > 0) {
        setHouses(data.data);
        setShowMore(data.data.length > 8);
      } else {
        setHouses([]);
        setShowMore(false);
      }
      setLoading(false);
    };
    
    fetchHouses();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    setSidebardata((prev) => ({
      ...prev,
      [id]: id === 'parking' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure housecategory is included in the state even if it is 'all'
    const urlParams = new URLSearchParams({
      ...sidebardata,
      housecategory: sidebardata.housecategory || 'all', // Explicitly set to 'all' if undefined
    });
    navigate(`/searchauth?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = houses.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`http://localhost:5000/api/property/activesearch?${urlParams.toString()}`);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      setHouses((prev) => [...prev, ...data.data]);
      setShowMore(data.data.length >= 9);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen '>
            <div className="border-solid border-2 border-slate-300 p-2 rounded-lg gap-2 shadow-sm">
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Search Term Input */}
            <div className="flex items-center gap-2">
              <label className='whitespace-nowrap font-semibold'>Search Term</label>
              <input type="text" id='searchTerm' placeholder='Search ...' className='border rounded-lg p-2 w-full' value={sidebardata.searchTerm} onChange={handleChange} />
            </div>

            {/* Category Selection */}
            <div className="flex gap-2 items-center whitespace-nowrap">
              <label className="font-semibold">Category:</label>
              <select id="housecategory" value={sidebardata.housecategory} onChange={handleChange} className="border rounded-lg p-2 w-full">
                <option value="all">All Categories</option>
                <option value="Apartama">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condominium">Condominium</option>
                <option value="compound_house">Compound House</option>
                <option value="single_house">Single House</option>
              </select>
            </div>

            {/* Parking Checkbox */}
            <div className="flex gap-2 flex-wrap items-center">
              <label className='font-semibold'>Parking:</label>
              <div className="flex gap-2">
                <input type="checkbox" id='parking' className='w-s' onChange={handleChange} checked={sidebardata.parking} />
                <span>Parking</span>
              </div>
            </div>

            {/* Submit Button */}
            <button className='bg-slate-600 text-white p-2 rounded-lg uppercase hover:opacity-95'>Search</button>
          </form>
        </div>
             </div>
        {/* Display Results */}
        <div className="flex-1">
          <h1 className='text-3l font-semibold border-b p-3 text-slate-700 mt-2'>House Result:</h1>
          <div className="p-7 flex flex-wrap gap-4">
            {loading ? (
              <div className='flex justify-center items-center'>
                <p className='font-semibold text-lg'>Loading...</p>
              </div>
            ) : (
              houses.length === 0 ? (
                <div className='flex justify-center items-center'>
                  <p className='font-semibold text-lg'>No houses found</p>
                </div>
              ) : (
                houses.map((house) => (
                  <HouseCard key={house._id} house={house} />
                ))
              )
            )}
          </div>
          {showMore && (
            <button onClick={onShowMoreClick} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}