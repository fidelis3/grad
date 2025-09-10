'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../../app/globals.css';

// TypeScript interfaces for better type safety
interface DashboardUser {
  fullname: string;
  specialty: string;
  email: string;
  _id: string;
}

interface DashboardData {
  user: DashboardUser;
  appointmentCount: number;
}

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  
  // Improved state management with proper typing
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    data: null,
    loading: true,
    error: null
  });
  
  const [token, setToken] = useState<string | null>(null);

  // Move localStorage access to useEffect to avoid SSR issues
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Use useCallback to memoize the function and fix dependency issues
  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    
    setDashboardState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const res = await axios.get('http://localhost:5000/doctor/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardState({
        data: res.data,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setDashboardState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      });
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push('/auth/doctor-signin');
      return;
    }
    fetchDashboardData();
  }, [token, router, fetchDashboardData]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Meddical</h2>
        <nav>
          <ul className="space-y-4">
            <li><a href="/doctor/dashboard" className="block hover:bg-blue-800 p-2 rounded">Dashboard</a></li>
            <li><a href="/doctor/appointments" className="block hover:bg-blue-800 p-2 rounded">Appointments</a></li>
            <li><a href="/doctor/ai-assistant" className="block hover:bg-blue-800 p-2 rounded">AI Assistant</a></li>
            <li><a href="/doctor/settings" className="block hover:bg-blue-800 p-2 rounded">Settings</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="bg-white shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
          <div>
            {dashboardState.data?.user?.fullname && (
              <span className="text-gray-700">Welcome, {dashboardState.data.user.fullname}</span>
            )}
          </div>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {dashboardState.loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-600">Loading dashboard data...</div>
            </div>
          ) : dashboardState.error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold mb-2">Error loading dashboard</h3>
                <p>{dashboardState.error}</p>
                <button 
                  onClick={fetchDashboardData}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : dashboardState.data ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700">Specialty: {dashboardState.data.user.specialty}</p>
              <p className="text-gray-700">Pending Appointments: {dashboardState.data.appointmentCount}</p>
            </>
          ) : (
            <div className="text-gray-600">No dashboard data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
