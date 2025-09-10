'use client';
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../../app/globals.css';

const AIAassistant: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
const res = await axios.post('https://grad-ws97.onrender.com/doctor/ai-assistant', { symptoms }, { headers: { Authorization: `Bearer ${token}` } });
setResponse(res.data.response);
    } catch {
      setResponse('Error getting AI response');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/auth/doctor-signin');
  }, [router]);

return (
    <div className="min-h-screen bg-gray-100 p-4">
<div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">AI Health Assistant</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
<div className="md:w-1/3 bg-blue-900 text-white p-4 rounded">
            <button className="w-full bg-white text-blue-900 py-2 rounded mb-2">Record Chat</button>
            <button className="w-full bg-white text-blue-900 py-2 rounded mb-2">New Chat</button>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="bg-gray-100 p-4 rounded">Describe symptoms for AI analysis...</div>
            <div className="bg-blue-50 p-4 rounded">AI: {response || 'Start by describing symptoms.'}</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe symptoms..." className="flex-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={loading} className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Start Assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAassistant;