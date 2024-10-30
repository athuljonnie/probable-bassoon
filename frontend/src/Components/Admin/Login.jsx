import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:7000/api/admin-login', data);
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('jwtToken', token);
                navigate('/dashboard');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        id="username"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button 
                    type="submit" 
                    className="w-full py-2 px-4 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
