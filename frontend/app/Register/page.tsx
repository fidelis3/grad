'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);


const Register: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        professionalRole: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
     
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

     
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: formData.fullName,
                    email: formData.emailAddress,
                    professionalRole: formData.professionalRole,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/Login');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check if the backend server is running.');
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignInClick = () => {
        router.push('/Login');
    };

    return (
        <div className="h-screen flex">
         
            <div className="hidden lg:flex lg:w-1/2 bg-blue-900 flex-col justify-center items-center px-8">
           
                <div className="text-center mb-6">
                    <h1 className="text-3xl xl:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                        Welcome To
                    </h1>
                    <h1 className="text-3xl xl:text-4xl font-bold" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                        <span className="text-white">Med</span>
                        <span className="text-blue-500">dical</span>
                    </h1>
                </div>
                
             
                <div className="relative w-full max-w-sm h-64 xl:h-72">
                    <Image
                        src="/Images/Doctor1.jpg"
                        alt="Medical Professional"
                        fill
                        className="object-cover object-top rounded-lg"
                        priority
                    />
                </div>
            </div>

           
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-sm w-full space-y-4">
                    
                
                    <div className="lg:hidden text-center mb-6">
                        <h1 className="text-2xl font-bold text-blue-900 mb-1" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                            Welcome To
                        </h1>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                            <span className="text-blue-900">Med</span>
                            <span className="text-blue-500">dical</span>
                        </h1>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            {error}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {success && (
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">
                                            {success}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                        
           
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                 
                        <div>
                            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Email
                            </label>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Enter your email address"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                            />
                        </div>

                     
                        <div>
                            <label htmlFor="professionalRole" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Professional Role
                            </label>
                            <select
                                id="professionalRole"
                                name="professionalRole"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                value={formData.professionalRole}
                                onChange={handleInputChange}
                            >
                                <option value="">Select your role</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                      
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                      
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-700 disabled:cursor-not-allowed transition-colors"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>

                   
                        <div className="text-center pt-2">
                            <p className="text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                <span className="text-black">Already have an account? </span>
                                <button
                                    type="button"
                                    onClick={handleSignInClick}
                                    className="text-blue-900 hover:text-blue-700 font-medium underline"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </form>

                 
                    <div className="pt-6">
                        <div className="flex justify-center space-x-6">
                            <button className="text-gray-600 hover:text-blue-500 transition-colors">
                                <TwitterIcon className="w-6 h-6" />
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 transition-colors">
                                <FacebookIcon className="w-6 h-6" />
                            </button>
                            <button className="text-gray-600 hover:text-pink-500 transition-colors">
                                <AppleIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Register;