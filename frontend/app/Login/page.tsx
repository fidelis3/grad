'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Social Media Icons
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

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to dashboard or home page
                router.push('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please check your connection and ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        router.push('/Register');
    };

    return (
        <div className="h-screen flex">
            {/* Left Column - Blue Background with Welcome Text and Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-900 flex-col justify-center items-center px-8">
                {/* Welcome Text */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl xl:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                        Welcome To
                    </h1>
                    <h1 className="text-3xl xl:text-4xl font-bold" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                        <span className="text-white">Med</span>
                        <span className="text-blue-500">dical</span>
                    </h1>
                </div>
                
                {/* Login Image */}
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

            {/* Right Column - Login Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-sm w-full space-y-4">
                    
                    {/* Mobile Welcome Text - Only shown on mobile */}
                    <div className="lg:hidden text-center mb-6">
                        <h1 className="text-2xl font-bold text-blue-900 mb-1" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                            Welcome To
                        </h1>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                            <span className="text-blue-900">Med</span>
                            <span className="text-blue-500">dical</span>
                        </h1>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Login Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-600 disabled:cursor-not-allowed"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    {/* Forgot Password */}
                    <div className="text-center">
                        <Link 
                            href="/PasswordReset" 
                            className="text-blue-900 hover:text-blue-700 text-sm underline"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Or sign in with
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                type="button" 
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                aria-label="Sign in with Twitter"
                            >
                                <TwitterIcon className="w-5 h-5 text-gray-600" />
                            </button>
                            <button 
                                type="button" 
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                aria-label="Sign in with Facebook"
                            >
                                <FacebookIcon className="w-5 h-5 text-gray-600" />
                            </button>
                            <button 
                                type="button" 
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                aria-label="Sign in with Apple"
                            >
                                <AppleIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Don&apos;t have an account?{' '}
                            <button
                                type="button"
                                onClick={handleSignUpClick}
                                className="text-blue-900 hover:text-blue-700 font-medium underline"
                                style={{ fontFamily: 'var(--font-work-sans)' }}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
