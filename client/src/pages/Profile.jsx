import { message } from 'antd';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alerts);
  const { user } = useSelector(state => state.users);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, avatar: reader.result });
      setFilePerc(100); // Simulating upload completion
    };
    reader.onerror = () => {
      setFileUploadError(true);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      dispatch(ShowLoading());
      const response = await axios.put(
        `/api/users/update-user-by-id/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(HideLoading());

      if (response.data.success) {
        message.success('User updated successfully');
        dispatch(SetUser(response.data.data));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || user.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error image upload(image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="email"
          placeholder="Email"
          disabled
          value={formData.email}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.name}
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={formData.password}
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className="border p-3 rounded-lg"
          id="confirmPassword"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
