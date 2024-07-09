
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="card">
      <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input className='inputL' type="email" name="email" value={email} onChange={onChange} required placeholder='Enter your email'/><br />
      <input className='inputL' type="password" name="password" value={password} onChange={onChange} required placeholder='Enter your password'/><br />
      <button className='btnL' type="submit">Login</button>
      <p>Don't have an account? <span onClick={goToRegister}>Signup</span></p>
    </form>
      </div>
    </div>
  );
};

export default Login;
