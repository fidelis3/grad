'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhoneIcon = ({ className }: { className: string }) => (
  <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.1459 33.1262C24.7274 32.7905 25.1502 32.2347 25.3211 31.5811C25.492 30.9275 25.3972 30.2296 25.0574 29.6411L23.7761 27.4219C23.4363 26.8333 22.8794 26.4022 22.2279 26.2235C21.5764 26.0447 20.8837 26.1329 20.3021 26.4687C15.9167 29.0006 13.3542 24.5622 12.0729 22.343C10.7917 20.1238 8.22919 15.6854 12.6146 13.1535C13.1962 12.8178 13.6189 12.2619 13.7899 11.6084C13.9608 10.9548 13.8659 10.2569 13.5261 9.66835L12.2449 7.44916C11.905 6.8606 11.3481 6.42952 10.6966 6.25075C10.0451 6.07199 9.35243 6.16019 8.77089 6.49594C3.28908 9.66086 1.28125 13.779 7.6875 24.875C14.0938 35.9709 18.6641 36.2911 24.1459 33.1262Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35.8156 23.9621C36.9804 19.4989 36.3314 14.7346 34.0113 10.716C31.6911 6.69743 27.8896 3.75324 23.442 2.53032M29.1022 22.12C29.4492 20.7945 29.5325 19.4104 29.3472 18.0469C29.162 16.6835 28.712 15.3672 28.0227 14.1735C27.3335 12.9798 26.4187 11.9319 25.3305 11.0897C24.2423 10.2476 23.002 9.62766 21.6806 9.26539M22.4248 20.2645C22.6577 19.3714 22.5278 18.4181 22.0635 17.6141C21.5993 16.81 20.8387 16.2208 19.9488 15.9759" stroke="#159EEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ className }: { className: string }) => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6777 31C24.962 31 31.6777 24.2843 31.6777 16C31.6777 7.71573 24.962 1 16.6777 1C8.39346 1 1.67773 7.71573 1.67773 16C1.67773 24.2843 8.39346 31 16.6777 31Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.6777 23.5L16.6777 16V6" stroke="#159EEC" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MapPinIcon = ({ className }: { className: string }) => (
  <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.35547 15.4C1.35547 29.8 16.3555 37 16.3555 37C16.3555 37 31.3555 29.8 31.3555 15.4C31.3555 7.45 24.643 1 16.3555 1C8.06797 1 1.35547 7.45 1.35547 15.4Z" stroke="#1F2B6C" strokeWidth="2"/>
    <path d="M16.3553 20.32C19.2051 20.32 21.5153 18.0098 21.5153 15.16C21.5153 12.3102 19.2051 10 16.3553 10C13.5055 10 11.1953 12.3102 11.1953 15.16C11.1953 18.0098 13.5055 20.32 16.3553 20.32Z" stroke="#159EEC" strokeWidth="2"/>
  </svg>
);

const BackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

interface HealthRecord {
  allergies: string;
  medications: string;
  medicalHistory: string;
  systolic: string;
  diastolic: string;
  lastUpdated?: string;
}

interface User {
  name: string;
  email: string;
}

export default function HealthRecordsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<HealthRecord>({
    allergies: '',
    medications: '',
    medicalHistory: '',
    systolic: '',
    diastolic: ''
  });
  const [submittedData, setSubmittedData] = useState<HealthRecord | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alertType, setAlertType] = useState<'normal' | 'elevated' | 'high' | 'crisis'>('normal');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldProgress, setFieldProgress] = useState({
    allergies: 0,
    medications: 0,
    medicalHistory: 0,
    bloodPressure: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/Login');
      return;
    }

    
    if (user?.email) {
      const userKey = `healthRecords_${user.email}`;
      const savedData = localStorage.getItem(userKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSubmittedData(parsedData);
        if (parsedData.systolic && parsedData.diastolic) {
          const alertInfo = getBloodPressureAlert(parseInt(parsedData.systolic), parseInt(parsedData.diastolic));
          setShowAlert(alertInfo.showAlert);
          setAlertType(alertInfo.type);
        }
      }
    }
  }, [user?.email, router]);

  const handleInputChange = (field: keyof HealthRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    
    const progress = Math.min((value.length / 50) * 100, 100);
    if (field === 'systolic' || field === 'diastolic') {
      const systolic = field === 'systolic' ? value : formData.systolic;
      const diastolic = field === 'diastolic' ? value : formData.diastolic;
      const bpProgress = (systolic && diastolic) ? 100 : (systolic || diastolic) ? 50 : 0;
      setFieldProgress(prev => ({ ...prev, bloodPressure: bpProgress }));
    } else {
      setFieldProgress(prev => ({ ...prev, [field]: progress }));
    }
  };

  const calculateOverallProgress = () => {
    const { allergies, medications, medicalHistory, bloodPressure } = fieldProgress;
    return Math.round((allergies + medications + medicalHistory + bloodPressure) / 4);
  };

  const getFieldIcon = (field: string, value: string) => {
    if (!value) return null;
    return (
      <div className="absolute top-2 right-2 flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    );
  };

  const getBloodPressureAlert = (systolic: number, diastolic: number) => {
    if (systolic >= 180 || diastolic >= 120) {
      return { showAlert: true, type: 'crisis' as const, message: 'HYPERTENSIVE CRISIS: Seek emergency medical care immediately!' };
    } else if (systolic >= 140 || diastolic >= 90) {
      return { showAlert: true, type: 'high' as const, message: 'HIGH BLOOD PRESSURE: Please consult your doctor soon.' };
    } else if (systolic > 120 || diastolic > 80) {
      return { showAlert: true, type: 'elevated' as const, message: 'ELEVATED BLOOD PRESSURE: Monitor regularly and consider lifestyle changes.' };
    } else if (systolic <= 120 && diastolic <= 80) {
      return { showAlert: false, type: 'normal' as const, message: 'NORMAL BLOOD PRESSURE: Keep up the good work!' };
    }
    return { showAlert: false, type: 'normal' as const, message: '' };
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-red-600 border-red-700 text-white';
      case 'high': return 'bg-red-100 border-red-400 text-red-700';
      case 'elevated': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'normal': return 'bg-green-100 border-green-400 text-green-700';
      default: return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const systolic = parseInt(formData.systolic);
      const diastolic = parseInt(formData.diastolic);
      
      const alertInfo = getBloodPressureAlert(systolic, diastolic);
      setShowAlert(alertInfo.showAlert);
      setAlertType(alertInfo.type);
      
      const dataToSave = { ...formData, lastUpdated: new Date().toISOString() };
      setSubmittedData(dataToSave);
      
      if (user?.email) {
        const userKey = `healthRecords_${user.email}`;
        localStorage.setItem(userKey, JSON.stringify(dataToSave));
      }
      
      setIsEditing(false);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      
      setFormData({
        allergies: '',
        medications: '',
        medicalHistory: '',
        systolic: '',
        diastolic: ''
      });
      
      
      setFieldProgress({
        allergies: 0,
        medications: 0,
        medicalHistory: 0,
        bloodPressure: 0
      });
      
    
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleEdit = () => {
    if (submittedData) {
      setFormData({
        allergies: submittedData.allergies,
        medications: submittedData.medications,
        medicalHistory: submittedData.medicalHistory,
        systolic: submittedData.systolic,
        diastolic: submittedData.diastolic
      });
      setIsEditing(true);
    }
  };

  const handleClearRecords = () => {
    if (confirm('Are you sure you want to clear all health records? This action cannot be undone.')) {
      if (user?.email) {
        const userKey = `healthRecords_${user.email}`;
        localStorage.removeItem(userKey);
      }
      setSubmittedData(null);
      setShowAlert(false);
      setFormData({
        allergies: '',
        medications: '',
        medicalHistory: '',
        systolic: '',
        diastolic: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full">
        <div className="bg-white px-4 py-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center justify-center lg:justify-start">
                <h1 className="text-2xl lg:text-3xl" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                  <span className="text-blue-900 font-normal">MED</span>
                  <span className="text-blue-500 font-normal">DICAL</span>
                </h1>
              </div>

              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                <div className="flex items-start space-x-2">
                  <PhoneIcon className="w-6 h-6 text-blue-900 mt-1" />
                  <div>
                    <p className="font-medium text-base text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      EMERGENCY
                    </p>
                    <p className="font-medium text-base text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      (237) 681-812-255
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <ClockIcon className="w-6 h-6 text-blue-900 mt-1" />
                  <div>
                    <p className="font-medium text-base text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      WORK HOUR
                    </p>
                    <p className="font-medium text-base text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      09:00 - 20:00 Everyday
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPinIcon className="w-6 h-6 text-blue-900 mt-1" />
                  <div>
                    <p className="font-medium text-base text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      LOCATION
                    </p>
                    <p className="font-medium text-base text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 lg:hidden">
                <div className="flex items-center justify-center space-x-2">
                  <PhoneIcon className="w-5 h-5 text-blue-900" />
                  <div className="text-center">
                    <p className="font-medium text-sm text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      EMERGENCY
                    </p>
                    <p className="font-medium text-sm text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      (237) 681-812-255
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-blue-900" />
                  <div className="text-center">
                    <p className="font-medium text-sm text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      WORK HOUR
                    </p>
                    <p className="font-medium text-sm text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      09:00 - 20:00 Everyday
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <MapPinIcon className="w-5 h-5 text-blue-900" />
                  <div className="text-center">
                    <p className="font-medium text-sm text-blue-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      LOCATION
                    </p>
                    <p className="font-medium text-sm text-blue-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="bg-blue-900">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:flex-1">
                <button
                  onClick={() => router.push('/')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Home
                </button>
                <button
                  onClick={() => router.push('/PatientPortal')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Portal
                </button>
                <button
                  onClick={() => router.push('/News')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  News
                </button>
              </div>

              <div className="lg:hidden flex items-center justify-between w-full">
                <button
                  onClick={() => router.push('/PatientPortal')}
                  className="flex items-center text-blue-100 hover:text-white transition-colors"
                >
                  <BackIcon className="w-5 h-5 mr-2" />
                  Back to Portal
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Health Records</h1>
          <p className="text-gray-600">Manage your personal health information</p>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-bounce">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Your health records have been saved successfully.</span>
            </div>
          </div>
        )}

        {(showAlert || (submittedData && (parseInt(submittedData.systolic) > 120 || parseInt(submittedData.diastolic) > 80))) && (
          <div className={`px-4 py-3 rounded mb-6 ${getAlertColor(alertType)}`}>
            <strong className="font-bold">
              {alertType === 'crisis' && 'HYPERTENSIVE CRISIS: '}
              {alertType === 'high' && 'HIGH BLOOD PRESSURE: '}
              {alertType === 'elevated' && 'ELEVATED: '}
              {alertType === 'normal' && 'NORMAL: '}
            </strong>
            <span className="block sm:inline">
              {alertType === 'crisis' && 'Seek emergency medical care immediately!'}
              {alertType === 'high' && 'Please consult your doctor soon.'}
              {alertType === 'elevated' && 'Monitor regularly and consider lifestyle changes.'}
              {alertType === 'normal' && 'Keep up the good work!'}
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">
                {isEditing ? 'Update Health Information' : 'Health Information Form'}
              </h2>
              <div className="flex items-center space-x-3">
                {/* Progress Circle */}
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-gray-200"
                      strokeWidth="3"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-blue-500 transition-all duration-300"
                      strokeWidth="3"
                      strokeDasharray={`${calculateOverallProgress()}, 100`}
                      strokeLinecap="round"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-500">{calculateOverallProgress()}%</span>
                  </div>
                </div>
                {submittedData && !isEditing && (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Edit Records
                  </button>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className={`relative transition-all duration-200 ${focusedField === 'allergies' ? 'transform scale-105' : ''}`}>
                <label className="text-black font-medium mb-2 flex items-center">
                  <span className="mr-2">🔬</span>
                  Known Allergies
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${fieldProgress.allergies}%` }}
                    ></div>
                  </div>
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  onFocus={() => setFocusedField('allergies')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="List any known allergies (e.g., penicillin, peanuts, latex)..."
                  className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none text-black placeholder-gray-500 transition-all duration-200 ${
                    focusedField === 'allergies' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                />
                {getFieldIcon('allergies', formData.allergies)}
                <div className="text-xs text-gray-500 mt-1">
                  {formData.allergies.length}/200 characters
                </div>
              </div>

              <div className={`relative transition-all duration-200 ${focusedField === 'medications' ? 'transform scale-105' : ''}`}>
                <label className="text-black font-medium mb-2 flex items-center">
                  <span className="mr-2">💊</span>
                  Current Medications
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${fieldProgress.medications}%` }}
                    ></div>
                  </div>
                </label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  onFocus={() => setFocusedField('medications')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="List all current medications with dosages..."
                  className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none text-black placeholder-gray-500 transition-all duration-200 ${
                    focusedField === 'medications' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                />
                {getFieldIcon('medications', formData.medications)}
                <div className="text-xs text-gray-500 mt-1">
                  {formData.medications.length}/200 characters
                </div>
              </div>

              <div className={`relative transition-all duration-200 ${focusedField === 'medicalHistory' ? 'transform scale-105' : ''}`}>
                <label className="text-black font-medium mb-2 flex items-center">
                  <span className="mr-2">📋</span>
                  Medical History
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${fieldProgress.medicalHistory}%` }}
                    ></div>
                  </div>
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  onFocus={() => setFocusedField('medicalHistory')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Previous surgeries, chronic conditions, family history..."
                  className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none text-black placeholder-gray-500 transition-all duration-200 ${
                    focusedField === 'medicalHistory' 
                      ? 'border-blue-500 bg-white shadow-lg transform scale-105' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                />
                {getFieldIcon('medicalHistory', formData.medicalHistory)}
                <div className="text-xs text-gray-500 mt-1">
                  {formData.medicalHistory.length}/500 characters
                </div>
              </div>

              <div className={`transition-all duration-200 ${focusedField === 'bloodPressure' ? 'transform scale-105' : ''}`}>
                <label className="text-black font-medium mb-2 flex items-center">
                  <span className="mr-2">❤️</span>
                  Blood Pressure
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${fieldProgress.bloodPressure}%` }}
                    ></div>
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Systolic (Normal: ≤120)</label>
                    <input
                      type="number"
                      value={formData.systolic}
                      onChange={(e) => handleInputChange('systolic', e.target.value)}
                      onFocus={() => setFocusedField('bloodPressure')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="120"
                      className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                        focusedField === 'bloodPressure' 
                          ? 'border-blue-500 bg-white shadow-lg' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    />
                    {formData.systolic && (
                      <div className={`absolute top-8 right-2 w-3 h-3 rounded-full animate-pulse ${
                        parseInt(formData.systolic) <= 120 ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Diastolic (Normal: ≤80)</label>
                    <input
                      type="number"
                      value={formData.diastolic}
                      onChange={(e) => handleInputChange('diastolic', e.target.value)}
                      onFocus={() => setFocusedField('bloodPressure')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="80"
                      className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                        focusedField === 'bloodPressure' 
                          ? 'border-blue-500 bg-white shadow-lg' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    />
                    {formData.diastolic && (
                      <div className={`absolute top-8 right-2 w-3 h-3 rounded-full animate-pulse ${
                        parseInt(formData.diastolic) <= 80 ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    )}
                  </div>
                </div>
                {(formData.systolic || formData.diastolic) && (
                  <div className="mt-2 text-sm animate-fade-in">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                      (parseInt(formData.systolic) > 120 || parseInt(formData.diastolic) > 80)
                        ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {(parseInt(formData.systolic) > 120 || parseInt(formData.diastolic) > 80)
                        ? '⚠️ Above Normal Range'
                        : '✅ Normal Range'
                      }
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 transform ${
                    isSubmitting 
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-blue-900 text-white hover:bg-blue-800 hover:scale-105 hover:shadow-lg active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    `${isEditing ? 'Update Records' : 'Save Health Records'}`
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        allergies: '',
                        medications: '',
                        medicalHistory: '',
                        systolic: '',
                        diastolic: ''
                      });
                      setFieldProgress({
                        allergies: 0,
                        medications: 0,
                        medicalHistory: 0,
                        bloodPressure: 0
                      });
                    }}
                    className="bg-gray-500 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {submittedData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">Your Health Records</h2>
                <div className="flex space-x-2">
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(submittedData.lastUpdated || '').toLocaleDateString()}
                  </span>
                  <button
                    onClick={handleClearRecords}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#C8DFF5] border border-gray-200 rounded-lg p-4 transform transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-black">Known Allergies</h3>
                    {submittedData.allergies && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700">{submittedData.allergies || 'None reported'}</p>
                </div>

                <div className="bg-[#C8DFF5] border border-gray-200 rounded-lg p-4 transform transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-black">Current Medications</h3>
                    {submittedData.medications && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700">{submittedData.medications || 'None reported'}</p>
                </div>

                <div className="bg-[#C8DFF5] border border-gray-200 rounded-lg p-4 transform transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-black">Medical History</h3>
                    {submittedData.medicalHistory && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700">{submittedData.medicalHistory || 'None reported'}</p>
                </div>

                <div className="bg-[#C8DFF5] border border-gray-200 rounded-lg p-4 transform transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-black">Blood Pressure</h3>
                    <div className="flex items-center space-x-2">
                      {((parseInt(submittedData.systolic) > 120) || (parseInt(submittedData.diastolic) > 80)) ? (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">ELEVATED</span>
                      ) : (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">NORMAL</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      {submittedData.systolic}/{submittedData.diastolic} mmHg
                    </span>
                    <div className="text-xs text-gray-500">
                      {((parseInt(submittedData.systolic) > 120) || (parseInt(submittedData.diastolic) > 80))
                        ? 'Above normal range'
                        : 'Within normal range'
                      }
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Health Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Monitor your blood pressure regularly</li>
                    <li>• Keep your medication list updated</li>
                    <li>• Inform doctors about all allergies</li>
                    <li>• Schedule regular check-ups</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}