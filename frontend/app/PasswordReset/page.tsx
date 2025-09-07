'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PasswordReset() {
    const router = useRouter();
    const [step, setStep] = useState<'email' | 'token' | 'password'>('email');
    const [formData, setFormData] = useState({
        email: '',
        token: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        try {
            const response = await fetch('http://localhost:5000/auth/password-reset/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Reset token: ${data.resetToken} (Valid for ${data.expiresIn})`);
                
                setFormData(prev => ({ ...prev, token: data.resetToken }));
                setStep('token');
            } else {
                setMessage(data.message || 'Failed to send reset token. Please try again.');
            }
        } catch (error) {
            setMessage('Network error. Please check if the backend server is running.');
            console.error('Password reset request error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTokenSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (formData.token.length < 6) {
                throw new Error('Invalid token');
            }
            setMessage('Token verified! Enter your new password.');
            setStep('password');
        } catch {
            setMessage('Invalid token. Please check and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/password-reset/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resetToken: formData.token,
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset successfully! Redirecting to login...');
                setTimeout(() => {
                    router.push('/Login');
                }, 2000);
            } else {
                setMessage(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setMessage('Network error. Please check if the backend server is running.');
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
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

              
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-blue-900" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                            Reset Your Password
                        </h2>
                    </div>

                
                    {step === 'email' && (
                        <form className="space-y-4" onSubmit={handleEmailSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-700 disabled:cursor-not-allowed transition-colors"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Token'}
                                </button>
                            </div>
                        </form>
                    )}

               
                    {step === 'token' && (
                        <form className="space-y-4" onSubmit={handleTokenSubmit}>
                            <div>
                                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                    Reset Token
                                </label>
                                <input
                                    id="token"
                                    name="token"
                                    type="text"
                                    required
                                    value={formData.token}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                    placeholder="Enter the reset token from your email"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-700 disabled:cursor-not-allowed transition-colors"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                >
                                    {loading ? 'Verifying...' : 'Verify Token'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'password' && (
                        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                    placeholder="Enter new password"
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
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-700 disabled:cursor-not-allowed transition-colors"
                                    style={{ fontFamily: 'var(--font-work-sans)' }}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    )}

               
                    {message && (
                        <div className={`text-center text-sm pt-4 ${
                            message.includes('Failed') || 
                            message.includes('Invalid') || 
                            message.includes('do not match') || 
                            message.includes('must be') || 
                            message.includes('Network error')
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`} style={{ fontFamily: 'var(--font-work-sans)' }}>
                            {message}
                        </div>
                    )}

            
                    <div className="text-center pt-6">
                       
                        <div className="flex justify-center space-x-4">
                           
                            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                                </svg>
                            </button>
                            
                          
                            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </button>
                            
                        
                            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

               
                    <div className="text-center pt-6">
                        <button
                            onClick={() => router.push('/Login')}
                            className="text-blue-900 hover:text-blue-700 text-sm font-medium underline"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}