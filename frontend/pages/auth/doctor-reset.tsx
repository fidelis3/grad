'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../app/globals.css';

const DoctorReset: React.FC = () => {
  const [step, setStep] = useState<'email' | 'change'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage('Reset token sent (check console for testing)');
        setStep('change');
        // In production, email sent; here, log token from res
      } else {
        setError('Email not found');
      }
    } catch {
      setError('Error sending reset');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      if (res.ok) {
        setMessage('Password changed! Redirecting to login...');
        setTimeout(() => router.push('/auth/doctor-signin'), 2000);
      } else {
        setError('Invalid token');
      }
    } catch {
      setError('Error changing password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Doctor Password Reset</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your email to reset password.</p>
        </div>
        {error && <div className="bg-red-50 p-3 rounded text-red-700 text-sm">{error}</div>}
        {message && <div className="bg-green-50 p-3 rounded text-green-700 text-sm">{message}</div>}
        {step === 'email' ? (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800">Send Reset Token</button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Reset Token" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required minLength={6} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800">Change Password</button>
          </form>
        )}
        <div className="text-center">
          <button onClick={() => router.push('/auth/doctor-signin')} className="text-blue-900 underline text-sm">Back to Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorReset;