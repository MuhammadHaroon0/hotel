import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if password meets requirements using regex
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(formData.password)) {
      setErrorMessage('Password must contain at least one capital letter, one number, and one special symbol.');
      return;
    }

    // If all checks pass, proceed with signup logic
    // You can make a POST request to your backend here to handle the signup process
    console.log('Signup successful!');
    console.log("Form data is : ",formData)

  //   try {
  //     setProgress(80);
  //     await postSignUpData(signupData);
  //     setProgress(100);
  //   } catch (error) {
  //     setProgress(100);
  //     notify("Wrong Email or Password");
  //     return;
  //   }
  //   notify("Signed up successfully.Now Login with your credentials");
  //   navigate("/login");
  // };


    // Clear form and error message
    setFormData({
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    });
    setErrorMessage('');
  };

  return (
    <div className='bg-slate-600 h-[100vh] flex flex-col justify-center items-center'>

      <h2>Signup Page</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} className='mt-16 flex flex-col gap-y-12 items-center justify-center'>

        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        
        <button type="submit">Signup</button>
      </form>


    </div>
  );
};

export default SignupPage;
