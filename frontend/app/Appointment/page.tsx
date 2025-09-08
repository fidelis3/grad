'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PhoneIcon = () => (
  <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.1459 33.1262C24.7274 32.7905 25.1502 32.2347 25.3211 31.5811C25.492 30.9275 25.3972 30.2296 25.0574 29.6411L23.7761 27.4219C23.4363 26.8333 22.8794 26.4022 22.2279 26.2235C21.5764 26.0447 20.8837 26.1329 20.3021 26.4687C15.9167 29.0006 13.3542 24.5622 12.0729 22.343C10.7917 20.1238 8.22919 15.6854 12.6146 13.1535C13.1962 12.8178 13.6189 12.2619 13.7899 11.6084C13.9608 10.9548 13.8659 10.2569 13.5261 9.66835L12.2449 7.44916C11.905 6.8606 11.3481 6.42952 10.6966 6.25075C10.0451 6.07199 9.35243 6.16019 8.77089 6.49594C3.28908 9.66086 1.28125 13.779 7.6875 24.875C14.0938 35.9709 18.6641 36.2911 24.1459 33.1262Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35.8156 23.9621C36.9804 19.4989 36.3314 14.7346 34.0113 10.716C31.6911 6.69743 27.8896 3.75324 23.442 2.53032M29.1022 22.12C29.4492 20.7945 29.5325 19.4104 29.3472 18.0469C29.162 16.6835 28.712 15.3672 28.0227 14.1735C27.3335 12.9798 26.4187 11.9319 25.3305 11.0897C24.2423 10.2476 23.002 9.62766 21.6806 9.26539M22.4248 20.2645C22.6577 19.3714 22.5278 18.4181 22.0635 17.6141C21.5993 16.81 20.8387 16.2208 19.9488 15.9759" stroke="#159EEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6777 31C24.962 31 31.6777 24.2843 31.6777 16C31.6777 7.71573 24.962 1 16.6777 1C8.39346 1 1.67773 7.71573 1.67773 16C1.67773 24.2843 8.39346 31 16.6777 31Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.6777 23.5L16.6777 16V6" stroke="#159EEC" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MapPinIcon = () => (
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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);


const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', image: '/images/Doctor1.jpg' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', image: '/images/Doctor2.jpg' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', image: '/images/Doctor3.jpg' },
  { id: 4, name: 'Dr. David Kim', specialty: 'Orthopedics', image: '/images/Doctor4.jpg' },
  { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Pediatrics', image: '/images/Doctor5.jpg' },
  { id: 6, name: 'Dr. James Wilson', specialty: 'Internal Medicine', image: '/images/Doctor1.jpg' },
  { id: 7, name: 'Dr. Maria Garcia', specialty: 'Gynecology', image: '/images/Doctor2.jpg' },
  { id: 8, name: 'Dr. Robert Brown', specialty: 'Psychiatry', image: '/images/Doctor3.jpg' },
];

const specialties = ['All', 'Cardiology', 'Neurology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Internal Medicine', 'Gynecology', 'Psychiatry'];


const morningSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const afternoonSlots = ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface User {
  name: string;
  email: string;
}

export default function AppointmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState('Follow Up');
  const [reason, setReason] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const filteredDoctors = filterSpecialty === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === filterSpecialty);

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canContinueStep1 = selectedDoctor !== null;
  const canContinueStep2 = selectedDate && selectedTime;
  const canContinueStep3 = reason.trim() !== '' && patientEmail.trim() !== '' && patientEmail.includes('@');

  const handleConfirmAppointment = async () => {
    if (!user) {
      alert('Please log in to book an appointment');
      return;
    }

    if (!selectedDoctor) {
      alert('Please select a doctor');
      return;
    }

    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token missing. Please log in again.');
      router.push('/Login');
      return;
    }

    console.log('Token exists:', !!token);
    console.log('Token length:', token ? token.length : 0);
    console.log('Token preview:', token ? token.substring(0, 50) + '...' : 'No token');
    console.log('User data:', user);

    setIsSubmitting(true);
    
    try {
      const appointmentData = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason: reason,
        patientEmail: patientEmail,
        status: 'confirmed'
      };

      console.log('Sending appointment data:', appointmentData);

      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        
        const userKey = `appointments_${user.email}`;
        const existingAppointments = JSON.parse(localStorage.getItem(userKey) || '[]');
        const newAppointment = {
          id: Date.now(),
          doctor: selectedDoctor.name,
          department: selectedDoctor.specialty,
          date: selectedDate,
          time: selectedTime,
          patientEmail: patientEmail,
          message: reason,
          type: appointmentType,
          status: 'confirmed'
        };
        
        existingAppointments.push(newAppointment);
        localStorage.setItem(userKey, JSON.stringify(existingAppointments));
        
        console.log('Appointment saved to localStorage for user:', user.email);
        
        setCurrentStep(4);
      } else {
        const errorData = await response.text();
        console.error('Server response:', response.status, errorData);
        
        if (response.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/Login');
          return;
        }
        
        throw new Error(`Failed to book appointment: ${response.status} ${errorData}`);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again.';
      alert(`Failed to book appointment. ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
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
                  <PhoneIcon />
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
                  <ClockIcon />
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
                  <MapPinIcon />
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
                  <PhoneIcon />
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
                  <ClockIcon />
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
                  <MapPinIcon />
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                    currentStep >= step
                      ? 'bg-blue-900 text-white'
                      : currentStep === step
                      ? 'bg-blue-900 text-white hover:bg-blue-800'
                      : 'bg-gray-300 text-black hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  {step}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-black">
                    {step === 1 && 'Select Doctor'}
                    {step === 2 && 'Choose Date and Time'}
                    {step === 3 && 'Appointment Details'}
                    {step === 4 && 'Confirmation'}
                  </p>
                </div>
                {step < 4 && <div className="w-16 h-px bg-gray-300 ml-8"></div>}
              </div>
            ))}
          </div>
        </div>

        
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Choose Your Doctor</h2>
            <p className="text-gray-600 mb-6">Select a doctor based on your needs and preference</p>

        
            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">Filter by Specialty</label>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

        
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? 'bg-blue-100 border-2 border-blue-900'
                      : 'bg-[#C8DFF5] border-2 border-transparent hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                disabled={!canContinueStep1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  canContinueStep1
                    ? 'bg-blue-900 text-white hover:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

    
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Select Date and Time</h2>
            <p className="text-gray-600 mb-6">Choose your preferred time slot with Dr. {selectedDoctor?.name}</p>

            <div className="grid lg:grid-cols-2 gap-8">
            
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                <div className="bg-[#C8DFF5] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                      className="p-2 hover:bg-blue-200 rounded"
                    >
                      ←
                    </button>
                    <h4 className="font-semibold text-gray-900">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                      className="p-2 hover:bg-blue-200 rounded"
                    >
                      →
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-700 p-2">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(currentDate).map((day, index) => (
                      <div key={index} className="aspect-square">
                        {day && (
                          <button
                            onClick={() => setSelectedDate(formatDate(day))}
                            className={`w-full h-full text-sm rounded transition-colors ${
                              selectedDate === formatDate(day)
                                ? 'bg-blue-900 text-white'
                                : 'text-black hover:bg-blue-200'
                            }`}
                          >
                            {day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

        
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
                <div className="border border-black rounded-lg p-4 bg-white">
                
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Morning</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {morningSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm border rounded transition-colors ${
                            selectedTime === time
                              ? 'border-blue-900 bg-blue-900 text-white'
                              : 'border-blue-900 bg-white text-black  hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Afternoon</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {afternoonSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm border rounded transition-colors ${
                            selectedTime === time
                              ? 'border-blue-900 bg-blue-900 text-white'
                              : 'border-blue-900 bg-white text-black  hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={!canContinueStep2}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  canContinueStep2
                    ? 'bg-blue-900 text-white hover:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

     
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Appointment Details</h2>
            <p className="text-gray-600 mb-6">Provide details about your appointment</p>

          
            <div className="bg-[#F4F4F4] border rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4 text-black">
                <div>
                  <span className="font-medium">Day:</span> {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {selectedDate && new Date(selectedDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {selectedTime}
                </div>
              </div>
            </div>

        
            <div className="mb-6">
              <label className="block text-black font-medium mb-2">Appointment Type</label>
              <div className="relative">
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-black"
                >
                  <option value="Follow Up" className="text-black">Follow Up</option>
                  <option value="Consultation" className="text-black">Consultation</option>
                  <option value="Emergency" className="text-black">Emergency</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

          
            <div className="mb-6">
              <label className="block text-black font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              />
            </div>

          
            <div className="mb-6">
              <label className="block text-black font-medium mb-2">Reason for Visit</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe your symptoms or reason for the visit..."
                className="w-full px-3 py-2 bg-[#F4F4F4] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none text-black placeholder-gray-500"
              />
            </div>

          
            <div className="bg-[#C8DFF5] border rounded-lg p-4 mb-8">
              <h4 className="font-semibold text-black mb-3">Important Notes:</h4>
              <ul className="text-black space-y-1 text-sm">
                <li>• Please arrive 15 minutes early for check-in</li>
                <li>• Bring a valid ID and insurance card</li>
                <li>• You&apos;ll receive a confirmation email shortly</li>
                <li>• Cancellations must be made 24 hours in advance</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmAppointment}
                disabled={!canContinueStep3 || isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  canContinueStep3 && !isSubmitting
                    ? 'bg-blue-900 text-white hover:bg-blue-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Appointment Confirmed!</h2>
              <p className="text-black">Your appointment has been successfully scheduled</p>
            </div>

          
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-black mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black">Doctor:</span>
                  <span className="font-medium text-black">{selectedDoctor?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Specialty:</span>
                  <span className="font-medium text-black">{selectedDoctor?.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Date:</span>
                  <span className="font-medium text-black">{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Time:</span>
                  <span className="font-medium text-black">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Type:</span>
                  <span className="font-medium text-black">{appointmentType}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/PatientPortal')}
              className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Return to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
