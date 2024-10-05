import React from 'react';
import { Form, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useTranslation } from 'react-i18next';

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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>{t('common.register.title')}</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-4'>
        <Form.Item name='name' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('register.nameError') }]}>
          <input
            type='text'
            className='p-3 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.namePlaceholder')}
          />
        </Form.Item>
        <Form.Item name='email' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('register.emailError') }, { type: 'email', message: t('register.emailInvalid') }]}>
          <input
            type='email'
            className='p-3 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.emailPlaceholder')}
          />
        </Form.Item>
        <Form.Item name='phone' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('register.phoneError') }]}>
          <input
            type='number'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.phonePlaceholder')}
          />
        </Form.Item>
        <Form.Item name='password' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('register.passwordError') }]}>
          <input
            type='password'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder={t('common.register.passwordPlaceholder')}
          />
        </Form.Item>
        <Form.Item name='role' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: t('register.roleError') }]}>
          <Select
            className='w-full'
            placeholder={t('common.register.rolePlaceholder')}
          >
            <Option value='tenant'>{t('common.register.roleTenant')}</Option>
            <Option value='landlord'>{t('common.register.roleLandlord')}</Option>
          </Select>
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {t('common.register.register')}
        </button>
      </Form>
      <div className='flex gap-2 mt-5'>
        <p>{t('common.register.haveAccount')}</p>
        <Link to='/Login' className='text-blue-700'>
          {t('common.register.login')}
        </Link>
      </div>
    </div>
  );
};

export default Register;
