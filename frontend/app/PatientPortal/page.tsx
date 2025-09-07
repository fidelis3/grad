'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TypeScript interfaces
interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipStatus: string;
  memberSince: string;
}

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status?: string;
  department?: string;
  message?: string;
}

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


const OverviewIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AppointmentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const HealthRecordsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EducationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const SymptomCheckerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m0 0V3m0 4h6" />
  </svg>
);

const MessagesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.2123 10.896C19.4083 7.396 24.2443 7.29 25.6623 10.578L25.7823 10.898L27.3963 15.618C27.7661 16.7005 28.3639 17.691 29.1491 18.5228C29.9344 19.3547 30.8889 20.0084 31.9483 20.44L32.3823 20.602L37.1023 22.214C40.6023 23.41 40.7083 28.246 37.4223 29.664L37.1023 29.784L32.3823 31.398C31.2994 31.7676 30.3085 32.3653 29.4763 33.1505C28.6441 33.9358 27.99 34.8904 27.5583 35.95L27.3963 36.382L25.7843 41.104C24.5883 44.604 19.7523 44.71 18.3363 41.424L18.2123 41.104L16.6003 36.384C16.2306 35.3012 15.633 34.3102 14.8477 33.478C14.0625 32.6459 13.1078 31.9918 12.0483 31.56L11.6163 31.398L6.89626 29.786C3.39426 28.59 3.28826 23.754 6.57626 22.338L6.89626 22.214L11.6163 20.602C12.6987 20.2321 13.6893 19.6344 14.5211 18.8491C15.3529 18.0639 16.0067 17.1094 16.4383 16.05L16.6003 15.618L18.2123 10.896ZM37.9983 4C38.3724 4 38.7391 4.10496 39.0566 4.30294C39.374 4.50093 39.6296 4.78401 39.7943 5.12L39.8903 5.354L40.5903 7.406L42.6443 8.106C43.0192 8.23339 43.3479 8.46923 43.5887 8.78363C43.8295 9.09803 43.9715 9.47684 43.9968 9.87204C44.0221 10.2672 43.9295 10.6611 43.7307 11.0036C43.5319 11.3461 43.2359 11.6219 42.8803 11.796L42.6443 11.892L40.5923 12.592L39.8923 14.646C39.7646 15.0209 39.5286 15.3494 39.2141 15.59C38.8996 15.8306 38.5207 15.9724 38.1255 15.9974C37.7303 16.0225 37.3366 15.9297 36.9942 15.7308C36.6518 15.5318 36.3762 15.2357 36.2023 14.88L36.1063 14.646L35.4063 12.594L33.3523 11.894C32.9773 11.7666 32.6486 11.5308 32.4078 11.2164C32.167 10.902 32.025 10.5232 31.9997 10.128C31.9744 9.73275 32.067 9.33894 32.2658 8.99643C32.4646 8.65391 32.7606 8.37812 33.1163 8.204L33.3523 8.108L35.4043 7.408L36.1043 5.354C36.2391 4.95885 36.4943 4.61582 36.8339 4.373C37.1736 4.13018 37.5807 3.99975 37.9983 4Z" fill="black"/>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function PatientPortal() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);

  useEffect(() => {
  
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);       }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedName(parsedUser.name || '');
      setEditedEmail(parsedUser.email || '');
    } else {
    
      router.push('/Login');
    }

    
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  
  useEffect(() => {
    if (!user?.email) return;

    const loadAppointments = () => {
      const userKey = `appointments_${user.email}`;
      const savedAppointments = localStorage.getItem(userKey);
      if (savedAppointments) {
        const allAppointments = JSON.parse(savedAppointments);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingAppointments = allAppointments.filter((appointment: Appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate >= today;
        });
        
        setAppointments(upcomingAppointments);
      }
    };

    loadAppointments();

    
    const handleStorageChange = (e: StorageEvent) => {
      if (user?.email && e.key === `appointments_${user.email}`) {
        loadAppointments();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    
    const appointmentCheckInterval = setInterval(loadAppointments, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(appointmentCheckInterval);
    };
  }, [user?.email]);

  const handleNavigation = (page: string) => {
    if (page === 'symptomchecker') {
     
      router.push('/symptomchecker');
    } else if (page === 'education') {
    
      router.push('/Education');
    } else if (page === 'appointments') {
    
      router.push('/Appointment');
    } else if (page === 'messages') {
    
      router.push('/Messages');
    } else {
      setCurrentPage(page);
      if (page === 'healthrecords') {
      router.push('/HealthRecords');
      }
    }
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    
    if (user?.email) {
      const userKeys = [
        `appointments_${user.email}`,
        `healthRecords_${user.email}`,
        `patientMessages_${user.email}`
      ];
      
      userKeys.forEach(key => {
        localStorage.removeItem(key);
      });
    }
    
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profilePicture');
    router.push('/Login');
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

    
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
        localStorage.setItem('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updatedUser: User = {
      name: editedName,
      email: editedEmail,
      phone: user?.phone || '+1 (555) 123-4567',
      address: user?.address || '123 Main St, Anytown, ST 12345',
      membershipStatus: user?.membershipStatus || 'Active',
      memberSince: user?.memberSince || 'January 2020'
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    setIsEditingProfile(false);
  };

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: OverviewIcon },
    { id: 'appointments', name: 'Appointments', icon: AppointmentIcon },
    { id: 'healthrecords', name: 'Health Records', icon: HealthRecordsIcon },
    { id: 'education', name: 'Education', icon: EducationIcon },
    { id: 'symptomchecker', name: 'Symptom Checker', icon: SymptomCheckerIcon },
    { id: 'messages', name: 'Messages', icon: MessagesIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

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
                  onClick={() => router.push('/LandingPage#services')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Services
                </button>
                <button
                  onClick={() => router.push('/LandingPage#doctors')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Doctors
                </button>
                <button
                  onClick={() => router.push('/News')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  News
                </button>
                <button
                  onClick={() => router.push('/LandingPage#contact')}
                  className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Contact
                </button>
              </div>

            
            
              <div className="lg:hidden flex items-center justify-between w-full">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-blue-100 hover:text-white"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
                <span className="text-blue-100 font-semibold text-lg">Patient Portal</span>
                <div></div> 
              </div>
            </div>

        
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-800">
                <button
                  onClick={() => router.push('/')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Home
                </button>
                <button
                  onClick={() => router.push('/LandingPage#services')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Services
                </button>
                <button
                  onClick={() => router.push('/LandingPage#doctors')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Doctors
                </button>
                <button
                  onClick={() => router.push('/News')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  News
                </button>
                <button
                  onClick={() => router.push('/LandingPage#contact')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  Contact
                </button>
               
              </div>
            </div>
          </div>
        </nav>
      </header>


      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        
          <div className="hidden lg:block">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <MenuIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-work-sans)' }}>
                {isSidebarOpen ? 'Collapse' : 'Expand'} Menu
              </span>
            </button>
          </div>


          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <UserIcon className="w-6 h-6" />
              )}
              <span className="hidden md:block" style={{ fontFamily: 'var(--font-work-sans)' }}>
                {user?.name || user?.email?.split('@')[0] || 'Patient'}
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

    
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {user?.name || 'Patient'}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {user?.email}
                      </p>
                    </div>
                  </div>
               
                </div>
                <button
                  onClick={() => {
                    handleNavigation('settings');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                >
                  View Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">

        <div className={`${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        } transition-all duration-300 ease-in-out bg-white shadow-lg lg:relative lg:block ${
          isMobile && !isSidebarOpen ? 'hidden' : ''
        } ${
          isMobile ? 'fixed inset-y-0 left-0 z-50' : ''
        }`}>
          
    
          {isMobile && (
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'var(--font-work-sans)' }}>
                Menu
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
          )}

        
          <nav className={`${isMobile ? 'mt-8' : 'mt-4'} overflow-hidden`}>
            <div className={`px-4 space-y-2 ${!isSidebarOpen && !isMobile ? 'px-2' : ''}`}>
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-50 text-blue-900 border-r-4 border-blue-900'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${!isSidebarOpen && !isMobile ? 'justify-center px-2' : ''}`}
                    style={{ fontFamily: 'var(--font-work-sans)' }}
                    title={!isSidebarOpen && !isMobile ? item.name : ''}
                  >
                    <IconComponent className={`w-5 h-5 ${isSidebarOpen || isMobile ? 'mr-3' : ''}`} />
                    {(isSidebarOpen || isMobile) && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                  </button>
                );
              })}
              
        
              <button
                onClick={handleLogout}
                className={`w-full flex items-center px-3 py-2 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors ${
                  !isSidebarOpen && !isMobile ? 'justify-center px-2' : ''
                }`}
                style={{ fontFamily: 'var(--font-work-sans)' }}
                title={!isSidebarOpen && !isMobile ? 'Logout' : ''}
              >
                <LogoutIcon className={`w-5 h-5 ${isSidebarOpen || isMobile ? 'mr-3' : ''}`} />
                {(isSidebarOpen || isMobile) && (
                  <span className="whitespace-nowrap">Logout</span>
                )}
              </button>
            </div>
          </nav>
        </div>

    
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}


        <div className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen && !isMobile ? 'ml-0' : !isMobile ? 'ml-0' : ''
        }`}>
          <main className="p-6">
            {currentPage === 'overview' && (
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  Welcome, {user?.name || user?.email?.split('@')[0] || 'Patient'}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                      {appointments.length > 0 && (
                        <button
                          onClick={() => setShowAppointmentDetails(!showAppointmentDetails)}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          {appointments.length}
                        </button>
                      )}
                    </div>
                    {appointments.length === 0 ? (
                      <p className="text-gray-600">No upcoming appointments</p>
                    ) : (
                      <p className="text-gray-600">You have {appointments.length} upcoming appointment{appointments.length > 1 ? 's' : ''}</p>
                    )}
                  </div>
                </div>

                {showAppointmentDetails && appointments.length > 0 && (
                  <div className="mb-8 p-6 rounded-lg border-2" style={{ backgroundColor: '#C8DFF5' }}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
                    <div className="space-y-4">
                      {appointments.map((appointment, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Doctor</p>
                              <p className="text-lg text-gray-900">{appointment.doctor}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Date & Time</p>
                              <p className="text-lg text-gray-900">{appointment.date} at {appointment.time}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Department</p>
                              <p className="text-lg text-gray-900">{appointment.department}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Patient Email</p>
                              <p className="text-lg text-gray-900">{appointment.patientEmail}</p>
                            </div>
                            {appointment.message && (
                              <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-700">Message</p>
                                <p className="text-lg text-gray-900">{appointment.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Quick Links
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <button
                      onClick={() => router.push('/symptomchecker')}
                      className="p-6 rounded-lg border-2 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      style={{ backgroundColor: '#ECF6FE' }}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <StarIcon className="w-12 h-12" />
                        <h3 className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          AI Symptom Checker
                        </h3>
                        <p className="text-xs text-black text-center" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Get AI powered assessment
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/Appointment')}
                      className="p-6 rounded-lg border-2 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      style={{ backgroundColor: '#ECF6FE' }}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <CalendarIcon className="w-8 h-8 text-black" />
                        <h3 className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Book Appointment
                        </h3>
                        <p className="text-xs text-black text-center" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Schedule with available doctors
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/Education')}
                      className="p-6 rounded-lg border-2 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      style={{ backgroundColor: '#ECF6FE' }}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <BookIcon className="w-8 h-8 text-black" />
                        <h3 className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Health Education
                        </h3>
                        <p className="text-xs text-black text-center" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Learn about your health conditions
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'appointments' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Appointments</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">Your appointments will appear here.</p>
                </div>
              </div>
            )}

            {currentPage === 'healthrecords' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Health Records</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">Your health records will appear here.</p>
                </div>
              </div>
            )}

            {currentPage === 'education' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Education</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">Educational resources will appear here.</p>
                </div>
              </div>
            )}

            {currentPage === 'symptomchecker' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Symptom Checker</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">Symptom checker tool will appear here.</p>
                </div>
              </div>
            )}

            {currentPage === 'messages' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Messages</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">Your messages will appear here.</p>
                </div>
              </div>
            )}

            {currentPage === 'settings' && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  Profile Settings
                </h1>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-xl font-semibold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Profile Information
                    </h2>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        style={{ fontFamily: 'var(--font-work-sans)' }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300">
                          <UserIcon className="w-16 h-16 text-gray-500" />
                        </div>
                      )}
                      
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Click the camera icon to upload a new profile picture
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-work-sans)' }}>
                      Max file size: 5MB. Supported formats: JPG, PNG, GIF
                    </p>
                  </div>

            
                  <div className="space-y-6">
                    {isEditingProfile ? (
                      <>
                
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                            placeholder="Enter your email address"
                          />
                        </div>

                       
                    
                        <div className="flex space-x-4 pt-4">
                          <button
                            onClick={handleSaveProfile}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            style={{ fontFamily: 'var(--font-work-sans)' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Full Name
                          </label>
                          <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            {user?.name || 'Not provided'}
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Email Address
                          </label>
                          <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            {user?.email}
                          </p>
                        </div>

                      

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Account Type
                          </label>
                          <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md" style={{ fontFamily: 'var(--font-work-sans)' }}>
                            Patient
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}