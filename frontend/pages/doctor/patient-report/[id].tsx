'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import '../../../app/globals.css';

interface ReportRow {
  testName: string;
  hct?: string;
  adm?: string;
  result?: string;
  mnh?: number;
  max?: number;
  icd?: string; // For HbA1c/HgbA1c
}

interface ReportData {
  message?: string;
  hct?: ReportRow[];
  hba1c?: ReportRow[];
  hgba1c?: ReportRow[];
}

const PatientReport: React.FC = () => {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError('No appointment ID provided');
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/doctor-signin');
      return;
    }
    axios.get(`https://grad-ws97.onrender.com/doctor/appointments/${id}/report`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then((res) => {
        setReport(res.data as ReportData); // Typed cast
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch report');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading report...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-600">{error}</div>;
  if (!report) return <div className="flex justify-center items-center min-h-screen bg-gray-100">No report found</div>;

  // Type guard for message
  const hasMessage = (obj: ReportData | null): obj is ReportData & { message: string } => obj !== null && typeof obj === 'object' && 'message' in obj && typeof obj.message === 'string';

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <button onClick={() => router.back()} className="bg-white text-black px-4 py-2 rounded border hover:bg-gray-50">
            Go Back
          </button>
          <button onClick={() => router.push('/doctor/dashboard')} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">
            Dashboard
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Patient Lab Report</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Hct Result</h3>
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-medium">Test Name</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Hct</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">ADM</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Result</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">MNH</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Max</th>
                </tr>
              </thead>
              <tbody>
                {(report.hct || []).map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-2 text-sm">{row.testName}</td>
                    <td className="px-2 py-2 text-sm">{row.hct || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.adm || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.result || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.mnh || 0}</td>
                    <td className="px-2 py-2 text-sm">{row.max || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">HbA1c Result</h3>
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-medium">Test Name</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">ICD</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">ADM</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Result</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">MNH</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Max</th>
                </tr>
              </thead>
              <tbody>
                {(report.hba1c || []).map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-2 text-sm">{row.testName}</td>
                    <td className="px-2 py-2 text-sm">{row.icd || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.adm || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.result || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.mnh || 0}</td>
                    <td className="px-2 py-2 text-sm">{row.max || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">HgbA1c Result</h3>
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-medium">Test Name</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">ICD</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">ADM</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Result</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">MNH</th>
                  <th className="px-2 py-2 text-left text-sm font-medium">Max</th>
                </tr>
              </thead>
              <tbody>
                {(report.hgba1c || []).map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-2 text-sm">{row.testName}</td>
                    <td className="px-2 py-2 text-sm">{row.icd || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.adm || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.result || '---'}</td>
                    <td className="px-2 py-2 text-sm">{row.mnh || 0}</td>
                    <td className="px-2 py-2 text-sm">{row.max || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {hasMessage(report) && <p className="mt-4 text-gray-600">{report.message}</p>} {/* Type guard for safe access */}
      </div>
    </div>
  );
};

export default PatientReport;