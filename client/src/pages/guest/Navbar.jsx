
// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react';
// import LanguageChange from "../../components/LanguageChange";
// import { useTranslation } from 'react-i18next';

// export default function Navbar() {
//   const { t } = useTranslation();
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.users);
//   const location = useLocation();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   }
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }

//   }, [location.search])
//   return (
//     <header className='bg-slate-200 shadow-md sticky top-0 z-10'>           
//       <div className='flex justify-between items-center max-w-16xl mx-auto p-3'>
//         <Link to='/'>
//           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-slate-500'>House</span>
//             <span className='text-slate-700'>Rent</span>
//           </h1>
//         </Link>
//         <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center' >
//           <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder={t('guest.navbar.search')} className='bg-transparent focus:outline-none w-24 sm:w-64' />
//           <button>
//             <FaSearch className='text-slate-600' />
//           </button>

//         </form>
//         <ul className='flex gap-4'>
//           <Link to='/'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>{t('guest.navbar.Home')}</li>
//           </Link>
          
//           <Link to='/about'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>{t('guest.navbar.About')}</li>
//           </Link>

//           <Link to='/profile'>
//             {user ? (
//               <img className='rounded-full h-7 w-7 object-cover' src={user.avatar} alt='profile' />
//             ) : (
//               <li className=' text-slate-700 hover:underline'>{t('guest.navbar.signin')}</li>
//             )}
//           </Link>
//           <li className='hidden sm:inline text-slate-700 hover:underline'><LanguageChange/></li>
//         </ul>
//       </div>
//     </header>
//   )
// }

import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import LanguageChange from "../../components/LanguageChange";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle burger menu
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-16xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex'>
            <span className='text-slate-500'>House</span>
            <span className='text-slate-700'>Rent</span>
          </h1>
        </Link>

        {/* Search form */}
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg hidden sm:flex items-center'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder={t('guest.navbar.search')} className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Burger Menu Button */}
        <button className='sm:hidden text-2xl' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu items (Responsive with hamburger) */}
        <ul className={`sm:flex sm:gap-4 ${isMenuOpen ? 'block' : 'hidden'} absolute sm:static left-0 right-0 top-16 bg-slate-200 sm:bg-transparent p-4 sm:p-0 z-10`}>
          <Link to='/'>
            <li className='text-slate-700 hover:underline p-2 sm:p-0'>{t('guest.navbar.Home')}</li>
          </Link>

           <Link to='/contact'>
            <li className='text-slate-700 hover:underline p-2 sm:p-0'>{t('guest.navbar.contact')}</li>
          </Link>

          <Link to='/about'>
            <li className='text-slate-700 hover:underline p-2 sm:p-0'>{t('guest.navbar.About')}</li>
          </Link>

          <Link to='/profile'>
            {user ? (
              <img className='rounded-full h-7 w-7 object-cover' src={user.avatar} alt='profile' />
            ) : (
              <li className='text-slate-700 hover:underline p-2 sm:p-0'>{t('guest.navbar.signin')}</li>
            )}
          </Link>

          <li className='text-slate-700 hover:underline p-2 sm:p-0'>
            <LanguageChange />
          </li>
        </ul>
      </div>

      {/* Search form for mobile (below navbar) */}
      <div className='bg-slate-100 p-3 rounded-lg sm:hidden flex items-center'>
        <form onSubmit={handleSubmit} className='w-full'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder={t('guest.navbar.search')} className='bg-transparent focus:outline-none w-full' />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
      </div>
    </header>
  );
}
