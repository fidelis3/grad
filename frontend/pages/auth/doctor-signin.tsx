'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../app/globals.css';

interface FormData {
  email: string;
  password: string;
}

const DoctorSignin: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/auth/doctor-login', { // Updated endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        setSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => router.push('/doctor/dashboard'), 2000);
      } else {
        setError(data.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      setError('Network error. Ensure backend is running on port 5000.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Column - Blue Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 flex-col justify-center items-center px-8 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back To</h1>
          <h1 className="text-4xl font-bold">
            <span className="text-white">Med</span>
            <span className="text-blue-300">dical</span>
          </h1>
        </div>
        <div className="relative w-full max-w-md h-72">
          <Image src="/images/doctor1.jpg" alt="Medical Professional" fill className="object-cover rounded-lg shadow-lg" priority />
        </div>
      </div>

      {/* Right Column - Form (Responsive) */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-md w-full space-y-6">
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-1">Welcome Back To</h1>
            <h1 className="text-3xl font-bold">
              <span className="text-blue-900">Med</span>
              <span className="text-blue-500">dical</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-700 text-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (min 6 chars)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <button
                onClick={() => router.push('/auth/doctor-signup')}
                className="text-blue-900 font-medium underline hover:text-blue-700"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="flex justify-center space-x-6 pt-6">
            <span className="text-gray-400">Social Login Coming Soon...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignin;