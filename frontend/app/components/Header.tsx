'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// SVG Icon Components
const PhoneIcon = ({ className }: { className: string }) => (
 <svg className={className} width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const Bars3Icon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XMarkIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleSectionNavigation = (sectionId: string) => {
  
    if (window.location.pathname === '/LandingPage') {
      
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
    
      router.push(`/LandingPage#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeNavigation = () => {
   
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  return (
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

             
              <div className="flex space-x-3">
                <button
                  onClick={() => handleNavigation('/Register')}
                  className="px-6 py-2 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors"
                >
                  SIGNUP
                </button>
                <button
                  onClick={() => handleNavigation('/Login')}
                  className="px-6 py-2 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors"
                >
                  LOGIN
                </button>
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

          
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleNavigation('/Register')}
                  className="px-4 py-2 bg-blue-100 rounded-md text-blue-900 hover:bg-blue-200 transition-colors text-sm"
                >
                  SIGNUP
                </button>
                <button
                  onClick={() => handleNavigation('/Login')}
                  className="px-4 py-2 bg-blue-100 text-blue-900 rounded-md hover:bg-blue-200 transition-colors text-sm"
                >
                  LOGIN
                </button>
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
                onClick={() => handleHomeNavigation()}
                className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleSectionNavigation('services')}
                className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleSectionNavigation('doctors')}
                className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
              >
                Doctors
              </button>
              <button
                onClick={() => handleNavigation('/News')}
                className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
              >
                News
              </button>
              <button
                onClick={() => handleSectionNavigation('contact')}
                className="text-blue-100 font-normal text-lg hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>

           
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavigation('/Register')}
                className="px-6 py-2 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors font-semibold"
              >
                Appointment
              </button>
            </div>

          
            <div className="lg:hidden flex items-center justify-between w-full">
              <span className="text-blue-100 font-semibold text-lg">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-blue-100 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

         
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-800">
                <button
                  onClick={() => handleHomeNavigation()}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-sm hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleSectionNavigation('services')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => handleSectionNavigation('doctors')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Doctors
                </button>
                <button
                    onClick={() => {
                      handleNavigation('/News');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                    News
                </button>
                <button
                  onClick={() => handleSectionNavigation('contact')}
                  className="block w-full text-left px-3 py-2 text-blue-100 font-semibold text-lg hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    handleNavigation('/Register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 mt-3 bg-blue-100 text-blue-900 rounded-md hover:bg-blue-200 transition-colors font-semibold"
                >
                  Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
