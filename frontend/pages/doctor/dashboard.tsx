'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'; // Import Event
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Appointment {
  _id: string;
  name: string;
  date: string;
  time?: string;
  status: string;
}

interface DashboardData {
  fullName: string;
  patients: number;
  earnings: number;
  appointments: Appointment[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({ fullName: '', patients: 0, earnings: 0, appointments: [] });
  const [events, setEvents] = useState<{ title: string; start: Date; end: Date }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/doctor-signin');
      return;
    }

    axios.get('http://localhost:5000/doctor/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const typedData = res.data as DashboardData;
        setData(typedData);
        setEvents(typedData.appointments.map(app => ({
          title: `${app.name} - ${app.status}`,
          start: new Date(app.date),
          end: new Date(new Date(app.date).getTime() + (app.time ? 60 * 60 * 1000 : 0)),
        })));
      })
      .catch((err) => {
        console.error(err);
        router.push('/auth/doctor-signin');
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading Dashboard...</div>;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Patients',
        data: [20, 25, 30, 28, 35, 32],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Returning Patients',
        data: [15, 18, 22, 20, 25, 28],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col hidden md:flex">
        <h2 className="text-xl font-bold mb-6 text-blue-900">Doctor Menu</h2>
        <ul className="space-y-4 flex-1">
          <li className="p-3 rounded cursor-pointer hover:bg-blue-50 text-blue-900 font-medium" onClick={() => router.push('/doctor/dashboard')}>Overview</li>
          <li className="p-3 rounded cursor-pointer hover:bg-gray-50" onClick={() => router.push('/doctor/patients')}>Patients</li>
          <li className="p-3 rounded cursor-pointer hover:bg-gray-50" onClick={() => router.push('/doctor/appointments')}>Appointments</li>
          <li className="p-3 rounded cursor-pointer hover:bg-gray-50" onClick={() => router.push('/doctor/ai-assistant')}>AI Assistant</li>
          <li className="p-3 rounded cursor-pointer hover:bg-gray-50" onClick={() => router.push('/doctor/settings')}>Settings</li>
        </ul>
      </aside>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Welcome back, Dr. {data.fullName}!</h1>
        <p className="text-gray-600 mb-6">Here are your appointments for today</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Patient Statistics</h2>
          <select aria-label="Select time period" className="mb-4 p-2 border rounded">
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <Line data={chartData} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Appointments and Notes</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor={(event) => event.start}
                endAccessor={(event) => event.end}
                style={{ height: 400 }}
                views={['month']}
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="font-bold mb-2">Today&apos;s Appointments</h3>
              <ul className="space-y-2">
                {data.appointments.filter((app) => new Date(app.date).toDateString() === new Date().toDateString()).map((app, i) => (
                  <li key={i} className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-gray-600">{app.time || app.date}</p>
                    <span className={`text-xs px-2 py-1 rounded ${app.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {app.status}
                    </span>
                    <button
                      onClick={() => router.push(`/doctor/patient-report/${app._id}`)}
                      className="ml-2 text-blue-500 text-sm underline hover:text-blue-700"
                    >
                      View Report
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200 cursor-pointer hover:bg-blue-100" onClick={() => router.push('/doctor/ai-assistant')}>
              <h3 className="font-bold text-blue-900 mb-2">AI Symptom Checker</h3>
              <p className="text-sm text-gray-600">Get AI powered assessment</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">Track Appointments</h3>
              <p className="text-sm text-gray-600">Schedule with available doctors</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">Health Education</h3>
              <p className="text-sm text-gray-600">Learn about your health condition</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;