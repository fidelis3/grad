'use client';

import React, { useState, useEffect, useRef } from 'react';
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

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface Message {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorName: string;
  doctorSpecialty: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  available: boolean;
}

const doctors: Doctor[] = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', image: '/images/Doctor1.jpg', available: true },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', image: '/images/Doctor2.jpg', available: true },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', image: '/images/Doctor3.jpg', available: false },
  { id: 4, name: 'Dr. David Kim', specialty: 'Orthopedics', image: '/images/Doctor4.jpg', available: true },
  { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Pediatrics', image: '/images/Doctor5.jpg', available: true },
  { id: 6, name: 'Dr. James Wilson', specialty: 'Internal Medicine', image: '/images/Doctor1.jpg', available: false },
  { id: 7, name: 'Dr. Maria Garcia', specialty: 'Gynecology', image: '/images/Doctor2.jpg', available: true },
  { id: 8, name: 'Dr. Robert Brown', specialty: 'Psychiatry', image: '/images/Doctor3.jpg', available: true },
];

export default function MessagesPage() {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [isComposing, setIsComposing] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setPatientName(user.name || '');
      setPatientEmail(user.email || '');
      
      
      const userKey = `patientMessages_${user.email}`;
      const savedMessages = localStorage.getItem(userKey);
      if (savedMessages) {
        setSentMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !subject.trim() || !message.trim()) return;

    setIsSending(true);

    // Simulate API call delay
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        patientName,
        patientEmail,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        subject: subject.trim(),
        message: message.trim(),
        priority,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      const updatedMessages = [newMessage, ...sentMessages];
      setSentMessages(updatedMessages);
      
      
      const userKey = `patientMessages_${patientEmail}`;
      localStorage.setItem(userKey, JSON.stringify(updatedMessages));

      
      setSubject('');
      setMessage('');
      setSelectedDoctor(null);
      setPriority('medium');
      setCharacterCount(0);
      setIsSending(false);
      setShowSuccess(true);

      
      setTimeout(() => setShowSuccess(false), 3000);

      
      setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 2000);
    }, 1500);
  };

  const updateMessageStatus = (messageId: string, newStatus: 'sent' | 'delivered' | 'read') => {
    setSentMessages(prev => {
      const updated = prev.map(msg =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      );
      
      
      const userKey = `patientMessages_${patientEmail}`;
      localStorage.setItem(userKey, JSON.stringify(updated));
      return updated;
    });
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    setCharacterCount(value.length);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Messages</h1>
          <p className="text-gray-600">Send secure messages to your healthcare providers</p>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-bounce">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <strong className="font-bold">Message Sent! </strong>
              <span className="block sm:inline">Your message has been sent to {selectedDoctor?.name}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black flex items-center">
                  <span className="mr-2">✉️</span>
                  {isComposing ? 'Compose Message' : 'Message Details'}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsComposing(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isComposing
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Compose
                  </button>
                  <button
                    onClick={() => setIsComposing(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      !isComposing
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Sent Messages ({sentMessages.length})
                  </button>
                </div>
              </div>

              {isComposing ? (
                <form onSubmit={handleSendMessage} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`transition-all duration-200 ${focusedField === 'patientName' ? 'transform scale-105' : ''}`}>
                      <label className="text-black font-medium mb-2 flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        onFocus={() => setFocusedField('patientName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your name"
                        className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                          focusedField === 'patientName' 
                            ? 'border-blue-500 bg-white shadow-lg' 
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                        required
                      />
                    </div>

                    <div className={`transition-all duration-200 ${focusedField === 'patientEmail' ? 'transform scale-105' : ''}`}>
                      <label className="text-black font-medium mb-2 flex items-center">
                        <span className="mr-2">📧</span>
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        onFocus={() => setFocusedField('patientEmail')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your email"
                        className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                          focusedField === 'patientEmail' 
                            ? 'border-blue-500 bg-white shadow-lg' 
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className={`transition-all duration-200 ${focusedField === 'doctor' ? 'transform scale-105' : ''}`}>
                    <label className="text-black font-medium mb-2 flex items-center">
                      <span className="mr-2">👨‍⚕️</span>
                      Select Doctor
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={searchDoctor}
                        onChange={(e) => setSearchDoctor(e.target.value)}
                        onFocus={() => setFocusedField('doctor')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Search doctors by name or specialty..."
                        className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                          focusedField === 'doctor' 
                            ? 'border-blue-500 bg-white shadow-lg' 
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => doctor.available && setSelectedDoctor(doctor)}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedDoctor?.id === doctor.id
                              ? 'bg-blue-100 border-2 border-blue-900 shadow-md'
                              : doctor.available
                              ? 'bg-[#C8DFF5] border-2 border-transparent hover:border-blue-300 hover:shadow-md'
                              : 'bg-gray-200 border-2 border-gray-300 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm">{doctor.name}</h3>
                              <p className="text-gray-600 text-xs">{doctor.specialty}</p>
                              <div className="flex items-center mt-1">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  doctor.available ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-xs text-gray-500">
                                  {doctor.available ? 'Available' : 'Unavailable'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`transition-all duration-200 ${focusedField === 'subject' ? 'transform scale-105' : ''}`}>
                      <label className="text-black font-medium mb-2 flex items-center">
                        <span className="mr-2">📝</span>
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Brief description of your concern"
                        className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all duration-200 ${
                          focusedField === 'subject' 
                            ? 'border-blue-500 bg-white shadow-lg' 
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                        required
                      />
                    </div>

                    <div className={`transition-all duration-200 ${focusedField === 'priority' ? 'transform scale-105' : ''}`}>
                      <label className="text-black font-medium mb-2 flex items-center">
                        <span className="mr-2">⚡</span>
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                          onFocus={() => setFocusedField('priority')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black appearance-none transition-all duration-200 ${
                            focusedField === 'priority' 
                              ? 'border-blue-500 bg-white shadow-lg' 
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className={`transition-all duration-200 ${focusedField === 'message' ? 'transform scale-105' : ''}`}>
                    <label className="text-black font-medium mb-2 flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="mr-2">💬</span>
                        Message
                      </span>
                      <span className="text-sm text-gray-500">
                        {characterCount}/1000 characters
                      </span>
                    </label>
                    <textarea
                      ref={messageRef}
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Describe your symptoms, concerns, or questions in detail..."
                      maxLength={1000}
                      className={`w-full px-3 py-2 bg-[#F4F4F4] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none text-black placeholder-gray-500 transition-all duration-200 ${
                        focusedField === 'message' 
                          ? 'border-blue-500 bg-white shadow-lg' 
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      required
                    />
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(characterCount / 1000) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || !selectedDoctor || !subject.trim() || !message.trim()}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-300 transform ${
                      isSending || !selectedDoctor || !subject.trim() || !message.trim()
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-900 text-white hover:bg-blue-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }`}
                  >
                    {isSending ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SendIcon className="w-5 h-5 mr-2" />
                        Send Message to {selectedDoctor?.name || 'Doctor'}
                      </div>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {sentMessages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">📭</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages sent yet</h3>
                      <p className="text-gray-600 mb-4">Start a conversation with your healthcare provider</p>
                      <button
                        onClick={() => setIsComposing(true)}
                        className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        Compose First Message
                      </button>
                    </div>
                  ) : (
                    sentMessages.map((msg) => (
                      <div key={msg.id} className="bg-[#C8DFF5] border border-gray-200 rounded-lg p-4 transform transition-all duration-200 hover:shadow-md hover:scale-105">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-black">{msg.subject}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(msg.priority)}`}>
                                {msg.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">To: {msg.doctorName} ({msg.doctorSpecialty})</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                              {msg.status === 'sent' && '📤 Sent'}
                              {msg.status === 'delivered' && '📬 Delivered'}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(msg.timestamp).toLocaleDateString()} at {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm bg-white p-3 rounded border-l-4 border-blue-500">
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-black mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Be specific about your symptoms
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Include relevant medical history
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Choose appropriate priority level
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Check your message before sending
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-black mb-4 flex items-center">
                <span className="mr-2">⏰</span>
                Response Times
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgent:</span>
                  <span className="font-medium text-red-600">Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Priority:</span>
                  <span className="font-medium text-orange-600">Within 6 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medium Priority:</span>
                  <span className="font-medium text-yellow-600">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Low Priority:</span>
                  <span className="font-medium text-green-600">Within 48 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2 text-lg">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Emergency Notice</h4>
                  <p className="text-sm text-yellow-700">
                    For medical emergencies, call 911 or go to the nearest emergency room. 
                    Do not use this messaging system for urgent medical situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}