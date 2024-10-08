import React from 'react';
import { Form, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useTranslation } from 'react-i18next';
import Navbar from './guest/Navbar';
import keyhouse from '../images/keyhouse.jpg';
const { Option } = Select;

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="">
      <Navbar/>
   
      <div className='py-4'>
    <div className=' object-cover flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl'>
    <div 
      className="hidden lg:block lg:w-1/2 bg-cover bg-center object-contain" 
      style={{ backgroundImage: `url(${keyhouse})` }}
    ></div>
    <div className="w-full p-4 lg:w-1/2">
      
      <h1 className='text-lg text-center font-semibold '>{t('common.register.title')}</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-0.5'>
        <Form.Item name='name' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('common.register.nameError') }]}>
          <input
            type='text'
            className='p-0.5 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.namePlaceholder')}
          />
        </Form.Item>
        <Form.Item name='email' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('common.register.emailError') }, { type: 'email', message: t('common.register.emailInvalid') }]}>
          <input
            type='email'
            className='p-1 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.emailPlaceholder')}
          />
        </Form.Item>
        <Form.Item
  name='phone'
  className='border p-1 rounded-lg focus:outline-none focus:border-blue-500'
  rules={[
    { required: true, message: t('common.register.phoneError') },
    { pattern: /^[97]\d{8}$/, message: t('common.login.phoneInvalid') }
  ]}
>
  <div className="flex items-center">
    <span className="p-3 bg-gray-200 rounded-l-lg">+251</span>
    <input
      type='number'
      className='border-none p-3 rounded-r-lg focus:outline-none focus:border-blue-500 w-full'
      placeholder={t('common.login.phonePlaceholder')}
    />
  </div>
</Form.Item>
        <Form.Item name='password' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('common.login.passwordError') }, { min: 6, message: t('common.login.passwordMinLength') }]}>
          <input
            type='password'
            className='border-none p-1 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.passwordPlaceholder')}
          />
        </Form.Item>
        <Form.Item name='role' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('common.register.roleError') }]}>
          <Select
            className='w-full'
            placeholder={t('common.register.rolePlaceholder')}
          >
            <Option value='tenant'>{t('common.register.roleTenant')}</Option>
            <Option value='landlord'>{t('common.register.roleLandlord')}</Option>
          </Select>
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {t('common.register.register')}
        </button>
      </Form>
      <div className='flex gap-1 mt-1'>
        <p>{t('common.register.haveAccount')}</p>
        <Link to='/Login' className='text-blue-700'>
          {t('common.register.login')}
        </Link>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
