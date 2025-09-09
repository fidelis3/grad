'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../../app/globals.css';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) router.push('/auth/doctor-signin');
    else fetchDashboardData();
  }, [token, router]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctor/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  };

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
            {dashboardData?.user?.fullname && <span className="text-gray-700">Welcome, {dashboardData.user.fullname}</span>}
          </div>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {dashboardData ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700">Specialty: {dashboardData.user.specialty}</p>
              <p className="text-gray-700">Pending Appointments: {dashboardData.appointmentCount}</p>
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