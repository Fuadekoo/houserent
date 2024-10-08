
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import LanguageChange from "../../components/LanguageChange";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users);
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

  }, [location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-16xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>House</span>
            <span className='text-slate-700'>Rent</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center' >
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder={t('guest.navbar.search')} className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <button>
            <FaSearch className='text-slate-600' />
          </button>

        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>{t('guest.navbar.Home')}</li>
          </Link>
          
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>{t('guest.navbar.About')}</li>
          </Link>

          <Link to='/profile'>
            {user ? (
              <img className='rounded-full h-7 w-7 object-cover' src={user.avatar} alt='profile' />
            ) : (
              <li className=' text-slate-700 hover:underline'>{t('guest.navbar.signin')}</li>
            )}
          </Link>
          <li className='hidden sm:inline text-slate-700 hover:underline'><LanguageChange/></li>
        </ul>
      </div>
    </header>
  )
}
