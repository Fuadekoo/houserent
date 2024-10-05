import React from 'react';
import { Form, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const { Option } = Select;

const Register = () => {
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
      <h1 className='text-3xl text-center font-semibold my-7'>Register page</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-4'>
        <Form.Item name='name' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: 'Please enter your name' }]}>
          <input
            type='text'
            className='p-3 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your name'
          />
        </Form.Item>
        <Form.Item name='email' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
          <input
            type='email'
            className='p-3 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your email'
          />
        </Form.Item>
        {/* add a +251 form fild that is outo fill form  infront of phone input */}
        

        <Form.Item name='phone' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <input
            type='number'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your phone number'
          />
        </Form.Item>
        <Form.Item name='password' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: 'Please enter your password' }]}>
          <input
            type='password'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your password'
          />
        </Form.Item>
        <Form.Item name='role' className='border p-1 rounded-lg focus:outline-none focus:border-blue-500' rules={[{ required: true, message: 'Please select your role' }]}>
          <Select
            className='w-full'
            placeholder='Select your role'
          >
            <Option value='tenant'>Tenant</Option>
            <Option value='landlord'>Landlord</Option>
          </Select>
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          Register
        </button>
      </Form>
      <div className='flex gap-2 mt-5'>
        <p>Do you have an account?</p>
        <Link to='/Login' className='text-blue-700'>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;