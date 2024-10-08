import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import LanguageChange from '../components/LanguageChange';
import { useTranslation } from 'react-i18next';
import Navbar from './guest/Navbar';
import Footer from './guest/Footer';
import keyhouse from '../images/keyhouse.jpg';
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("http://localhost:5000/api/users/login", values);

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        dispatch(HideLoading());
        navigate("/myhome");
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="">
      <Navbar/>
    <div className='py-16'>
    <div className=' flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl'>
    <div 
      className="hidden lg:block lg:w-1/2 bg-cover bg-center object-contain" 
      style={{ backgroundImage: `url(${keyhouse})` }}
    ></div>
    <div className="w-full p-8 lg:w-1/2">
      <h1 className='text-3xl text-center font-semibold my-7'>{t('common.login.loginpage')}</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-2'>
        <Form.Item
          name='phone'
          className='border p-1 rounded-lg focus:outline-none focus:border-blue-500'
          rules={[
            { required: true, message: t('common.login.phoneError') },
            { pattern: /^[0-9]{9}$/, message: t('common.login.phoneInvalid') }
          ]}
        >
          <div className="flex items-center">
            <span className="p-3 bg-gray-200 rounded-l-lg">+251</span>
            <input
              type='number'
              className='border-none p-2 rounded-r-lg focus:outline-none focus:border-blue-500 w-full'
              placeholder={t('common.login.enterphone')}
            />
          </div>
        </Form.Item>
        <Form.Item
          name='password'
          className='border p-1 rounded-lg focus:outline-none focus:border-blue-500'
          rules={[
            { required: true, message: t('common.login.passwordError') },
            { min: 6, message: t('common.login.passwordMinLength') }
          ]}
        >
          <input
            type='password'
            className='border-none p-2 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.login.enterpassword')}
          />
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {t('common.login.login')}
        </button>
      </Form>
      <div className='flex gap-2 mt-5'>
        <p>{t('common.login.dont')}</p>
        <Link to='/Register' className='text-blue-700'>
          {t('common.login.register')}
        </Link>
      </div>
      </div>
    </div>
    </div>
    {/* <Footer /> */}
    </div>
  );
};
export default Login;