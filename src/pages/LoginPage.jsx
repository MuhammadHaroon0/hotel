import React, { useState } from 'react';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any client-side validation if needed

    // If all checks pass, proceed with login logic 
    // You can make a POST request to your backend here to handle the login process
    console.log('Login successful!');

    // Clear form and error message
    setFormData({
      email: '',
      password: ''
    });
    setErrorMessage('');
  };

  return (
    <div className=' h-[100vh] flex flex-col justify-center items-center'>

      <h2 className='text-6xl'>Login Here</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className='mt-16 flex flex-col gap-y-12 items-center justify-center'>

        <div className='flex gap-x-6'>
          <label className='text-3xl'>Email:</label>
          <input className='rounded-md  px-3 border-2 border-black'
            placeholder='Enter email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className='flex gap-x-6 mr-12'>
          <label className='text-3xl'>Password:</label>
          <input className='rounded-md px-3 border-2 border-black'
            placeholder='Enter password'
            type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <Button type="submit" content="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
