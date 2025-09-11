'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import '../../app/globals.css';

interface DashboardData {
  user: {
    fullname: string;
    specialty: string;
  };
  appointmentCount: number;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {

    if (!token) return; 
    
    try {
      const res = await axios.get('https://grad-ws97.onrender.com/doctor/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data as DashboardData);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [token, fetchDashboardData]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Meddical</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/doctor/dashboard" className="block hover:bg-blue-800 p-2 rounded">Dashboard</Link></li>
            <li><Link href="/doctor/appointments" className="block hover:bg-blue-800 p-2 rounded">Appointments</Link></li>
            <li><Link href="/doctor/ai-assistant" className="block hover:bg-blue-800 p-2 rounded">AI Assistant</Link></li>
            <li><Link href="/doctor/settings" className="block hover:bg-blue-800 p-2 rounded">Settings</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="bg-white shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
          <div>
            {/* --- CHANGE 1: Added optional chaining --- */}
            <span className="text-gray-700">Welcome, {dashboardData?.user?.fullname}</span>
          </div>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {dashboardData ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              {/* --- CHANGE 2: Added optional chaining --- */}
              <p className="text-gray-700">Specialty: {dashboardData?.user?.specialty}</p>
              {/* --- CHANGE 3: Added optional chaining --- */}
              <p className="text-gray-700">Pending Appointments: {dashboardData?.appointmentCount}</p>
            </>
          ) : (
            <p>Loading dashboard data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;