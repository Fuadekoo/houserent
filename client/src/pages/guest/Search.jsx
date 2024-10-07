import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HouseCard from './HouseCard';
import Navbar from './Navbar';

export default function Search() {
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
    navigate(`/search?${urlParams.toString()}`);
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
      <Navbar />
      <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Search Term Input */}
            <div className="flex items-center gap-2">
              <label className='whitespace-nowrap font-semibold'>Search Term</label>
              <input type="text" id='searchTerm' placeholder='Search ...' className='border rounded-lg p-3 w-full' value={sidebardata.searchTerm} onChange={handleChange} />
            </div>

            {/* Category Selection */}
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Category:</label>
              <select id="housecategory" value={sidebardata.housecategory} onChange={handleChange} className="border rounded-lg p-3 w-full">
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
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
          </form>
        </div>

        {/* Display Results */}
        <div className="flex-1">
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result:</h1>
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












// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HouseCard from '../HouseCard';
// import Navbar from './Navbar';

// export default function Search() {
    
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [houses, setHouses] = useState([]);
//     const [showMore, setShowMore] = useState(false);
//     const [sidebardata, setSidebardata] = useState({
//         searchTerm: '',
//         housecategory: 'all',
//         parking: false,
//         minBathrooms: 0,
//         minBedrooms: 0,
//         minRent: 0,
//         maxRent: 0,
//         sort: 'createdAt',
//         order: 'desc',
//     });

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const searchTermFromUrl = urlParams.get('searchTerm');
//         const housecategoryFromUrl = urlParams.get('housecategory');
//         const parkingFromUrl = urlParams.get('parking');
//         const minBathroomsFromUrl = urlParams.get('minBathrooms');
//         const minBedroomsFromUrl = urlParams.get('minBedrooms');
//         const minRentFromUrl = urlParams.get('minRent');
//         const maxRentFromUrl = urlParams.get('maxRent');
//         const sortFromUrl = urlParams.get('sort');
//         const orderFromUrl = urlParams.get('order');

//         if (
//             searchTermFromUrl ||
//             housecategoryFromUrl ||
//             parkingFromUrl ||
//             minBathroomsFromUrl ||
//             minBedroomsFromUrl ||
//             minRentFromUrl ||
//             maxRentFromUrl ||
//             sortFromUrl ||
//             orderFromUrl
//         ) {
//             setSidebardata({
//                 searchTerm: searchTermFromUrl || '',
//                 housecategory: housecategoryFromUrl || 'all',
//                 parking: parkingFromUrl === 'true',
//                 minBathrooms: parseInt(minBathroomsFromUrl) || 0,
//                 minBedrooms: parseInt(minBedroomsFromUrl) || 0,
//                 minRent: parseInt(minRentFromUrl) || 0,
//                 maxRent: parseInt(maxRentFromUrl) || 0,
//                 sort: sortFromUrl || 'createdAt',
//                 order: orderFromUrl || 'desc',
//             });
//         }

//         const fetchHouses = async () => {
//             setLoading(true);
//             setShowMore(false);

//             // Debugging the query string
//             const searchQuery = urlParams.toString();
//             console.log("Search Query:", searchQuery);

//             try {
//                 const res = await fetch(`/api/property/activesearch?${searchQuery}`);
//                 const data = await res.json();

//                 if (!res.ok) {
//                     throw new Error(data.message || 'Failed to fetch houses');
//                 }

//                 if (data.data.length > 8) {
//                     setShowMore(true);
//                 } else {
//                     setShowMore(false);
//                 }

//                 setHouses(data.data);
//             } catch (error) {
//                 console.error("Error fetching houses:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHouses();
//     }, [window.location.search]);

//     const handleChange = (e) => {
//         const { id, value, checked, type } = e.target;

//         if (type === 'checkbox') {
//             setSidebardata((prev) => ({ ...prev, [id]: checked }));
//         } else {
//             setSidebardata((prev) => ({ ...prev, [id]: value }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const urlParams = new URLSearchParams();

//         urlParams.set('searchTerm', sidebardata.searchTerm);
//         urlParams.set('housecategory', sidebardata.housecategory);
//         urlParams.set('parking', sidebardata.parking);
//         urlParams.set('minBathrooms', sidebardata.minBathrooms);
//         urlParams.set('minBedrooms', sidebardata.minBedrooms);
//         urlParams.set('minRent', sidebardata.minRent);
//         urlParams.set('maxRent', sidebardata.maxRent);
//         urlParams.set('sort', sidebardata.sort);
//         urlParams.set('order', sidebardata.order);

//         const searchQuery = urlParams.toString();
//         navigate(`/search?${searchQuery}`);
//     };

//     const onShowMoreClick = async () => {
//         const numberOfListings = houses.length;
//         const startIndex = numberOfListings;
//         const urlParams = new URLSearchParams(window.location.search);
//         urlParams.set('startIndex', startIndex);
//         const searchQuery = urlParams.toString();

//         try {
//             const res = await fetch(`/api/property/activesearch?${searchQuery}`);
//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.message || 'Failed to fetch more houses');
//             }

//             if (data.data.length < 9) {
//                 setShowMore(false);
//             }

//             setHouses([...houses, ...data.data]);
//         } catch (error) {
//             console.error("Error loading more houses:", error);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
        
//         <div className="flex flex-col md:flex-row">
//             <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                     {/* Search Form Inputs */}
//                     {/* ... (as in your original code) */}

//                     <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
//                         Search
//                     </button>
//                 </form>
//             </div>

//             <div className="flex-1">
//                 <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
//                     House Results:
//                 </h1>
//                 <div className="p-7 flex flex-wrap gap-4">
//                     {!loading && houses.length === 0 && <p className="text-2xl text-center">No houses found</p>}
//                     {loading && <p className="text-2xl text-center">Loading...</p>}
//                     {!loading && houses.map((house) => <HouseCard key={house._id} house={house} />)}
//                     {showMore && (
//                         <button onClick={onShowMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">
//                             Show More
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }
