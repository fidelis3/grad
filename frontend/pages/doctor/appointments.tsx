'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';

const locales = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
  patientName: string;
  date: string;
  time?: string;
  reason: string;
  status: string;
}

const DoctorAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [events, setEvents] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/doctor-signin');
      return;
    }
    axios.get('http://localhost:5000/doctor/appointments', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const typedData = res.data as Appointment[];
        setAppointments(typedData);
        setEvents(typedData.map(app => ({ 
          title: `${app.patientName} - ${app.status}`, 
          start: new Date(app.date), 
          end: new Date(new Date(app.date).getTime() + 60 * 60 * 1000) 
        })));
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load appointments');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleAcceptReject = async (id: string, status: 'accepted' | 'rejected') => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/doctor/appointments/${id}/accept-reject`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(prev => prev.map(app => app._id === id ? { ...app, status } : app)); // Update state
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Failed to update appointment');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading Appointments...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <div className="flex justify-between mb-4">
          <button onClick={() => router.back()} className="bg-white text-black px-4 py-2 rounded border">Go Back</button>
          <div className="flex space-x-2">
            <button className="bg-blue-900 text-white px-4 py-2 rounded">Today</button>
            <button className="bg-white text-black px-4 py-2 rounded border">Week</button>
            <button className="bg-white text-black px-4 py-2 rounded border">Month</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Year</button>
          </div>
          <button onClick={() => router.push('/doctor/dashboard')} className="bg-blue-900 text-white px-4 py-2 rounded">Dashboard</button>
        </div>
        {/* Calendar - Now with localizer */}
        <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 400 }} />
        {/* List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Appointment List</h2>
          <ul className="space-y-4">
            {appointments.map((app) => (
              <li key={app._id} className="p-4 bg-gray-50 rounded">
                <p className="font-bold">{app.patientName} - {app.date} {app.time}</p>
                <p className="text-gray-600">{app.reason}</p>
                <p>Status: {app.status}</p>
                {app.status === 'pending' && (
                  <div className="space-x-2 mt-2">
                    <button onClick={() => handleAcceptReject(app._id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                    <button onClick={() => handleAcceptReject(app._id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;