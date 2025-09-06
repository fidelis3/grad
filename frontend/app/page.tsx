'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// SVG Icon Components for the navbar
const Bars3Icon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const languages = ['English', 'Swahili', 'Amharic', 'French'];
  const countries = [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'Ethiopia', flag: '🇪🇹' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'Tanzania', flag: '🇹🇿' },
    { name: 'Uganda', flag: '🇺🇬' },
    { name: 'Rwanda', flag: '🇷🇼' },
    { name: 'Morocco', flag: '🇲🇦' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Sweden', flag: '🇸🇪' }
  ];

  const totalSlides = 2;
  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleSectionNavigation = (sectionId: string) => {
    router.push(`/LandingPage#${sectionId}`);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setIsCountryDropdownOpen(false);
  };

  const handleContinue = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to landing page
      router.push('/LandingPage');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h1>Hello from Next.js</h1>
      <p>
        This is a test page to confirm deployment is working. It should be
        working.
      </p>
    </div>
  );
}
=======
    <div className="min-h-screen bg-white">
      {/* Blue Navigation Bar */}
      <nav className="bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center h-14">
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <button
                onClick={() => handleNavigation('/')}
                className="text-blue-100 font-normal text-base hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleSectionNavigation('services')}
                className="text-blue-100 font-normal text-base hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleSectionNavigation('doctors')}
                className="text-blue-100 font-normal text-base hover:text-white transition-colors"
              >
                Doctors
              </button>
              <button
                onClick={() => handleNavigation('/News')}
                className="text-blue-100 font-normal text-base hover:text-white transition-colors"
              >
                News
              </button>
              <button
                onClick={() => handleSectionNavigation('contact')}
                className="text-blue-100 font-normal text-base hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button - Centered */}
            <div className="lg:hidden flex items-center justify-center w-full">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-blue-100 hover:text-white flex items-center space-x-2"
              >
                <span className="text-blue-100 font-semibold text-base">Menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <Bars3Icon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-800">
                <button
                  onClick={() => handleNavigation('/')}
                  className="block w-full text-center px-3 py-2 text-blue-100 font-semibold text-base hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleSectionNavigation('services')}
                  className="block w-full text-center px-3 py-2 text-blue-100 font-semibold text-base hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => handleSectionNavigation('doctors')}
                  className="block w-full text-center px-3 py-2 text-blue-100 font-semibold text-base hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Doctors
                </button>
                <button
                  onClick={() => handleNavigation('/News')}
                  className="block w-full text-center px-3 py-2 text-blue-100 font-semibold text-base hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  News
                </button>
                <button
                  onClick={() => handleSectionNavigation('contact')}
                  className="block w-full text-center px-3 py-2 text-blue-100 font-semibold text-base hover:text-white hover:bg-blue-800 rounded-md transition-colors"
                >
                  Contact
                </button>
               
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Progress Bar - Detached with spacing and rounded edges */}
      <div className="px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div 
              className="bg-blue-900 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 lg:py-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Slide 1: Language Selection */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[400px]">
              
              {/* Left Content */}
              <div className="space-y-6">
                {/* Welcome Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                  <span className="text-blue-900">Welcome To Med</span>
                  <span className="text-blue-500">dical</span>
                </h1>

                {/* Language Selection */}
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                    Choose Your Preferred Language:
                  </h2>

                  {/* Language Checkboxes */}
                  <div className="space-y-3">
                    {languages.map((language) => (
                      <label key={language} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(language)}
                          onChange={() => handleLanguageChange(language)}
                          className="w-4 h-4 text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-base text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          {language}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md h-80 lg:h-[400px]">
                  <Image
                    src="/Images/Onboarding1.jpg"
                    alt="Welcome to Meddical"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                  {/* White quarter circle overlay for bottom left corner */}
                  <div className="absolute bottom-0 left-0 bg-white" 
                       style={{
                         width: '180px',
                         height: '180px',
                         borderRadius: '0 100% 0 0',
                         borderBottomLeftRadius: '0.5rem'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: Country Selection */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[400px]">
              
              {/* Left Content */}
              <div className="space-y-6">
                {/* Country Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
                  <span className="text-black">Which </span>
                  <span className="text-blue-900">Country</span>
                  <span className="text-black"> Are You From?</span>
                </h1>

                {/* Country Dropdown */}
                <div className="space-y-4">
                  <div className="relative">
                    <button
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="w-full px-4 py-3 text-left bg-blue-900 border-2 border-blue-900 rounded-lg focus:outline-none focus:border-blue-700 flex items-center justify-between"
                    >
                      <span className="text-base text-white flex items-center" style={{ fontFamily: 'var(--font-work-sans)' }}>
                        {selectedCountry ? (
                          <>
                            <span className="mr-2 text-lg">
                              {countries.find(c => c.name === selectedCountry)?.flag}
                            </span>
                            {selectedCountry}
                          </>
                        ) : (
                          'Select your country'
                        )}
                      </span>
                      <ChevronDownIcon className={`w-5 h-5 text-white transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {countries.map((country) => (
                          <label key={country.name} className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                            <input
                              type="radio"
                              name="country"
                              checked={selectedCountry === country.name}
                              onChange={() => handleCountrySelect(country.name)}
                              className="w-4 h-4 text-blue-900 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-xl mr-2">{country.flag}</span>
                            <span className="text-base font-medium text-gray-800" style={{ fontFamily: 'var(--font-work-sans)' }}>
                              {country.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md h-80 lg:h-[400px]">
                  <Image
                    src="/Images/Onboarding1.jpg"
                    alt="Country Selection"
                    fill
                    className="object-cover rounded-lg"
                  />
                  {/* White quarter circle overlay for bottom left corner */}
                  <div className="absolute bottom-0 left-0 bg-white" 
                       style={{
                         width: '180px',
                         height: '180px',
                         borderRadius: '0 100% 0 0',
                         borderBottomLeftRadius: '0.5rem'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-end items-center space-x-4 mt-8 lg:mt-10">
            {currentSlide > 0 && (
              <button
              onClick={handleBack}
              className="px-5 py-2 bg-white text-blue-900 border-2 border-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
              style={{ fontFamily: 'var(--font-work-sans)' }}
              >
              Back
              </button>
            )}
            
            <button
              onClick={handleContinue}
              className="px-5 py-2 bg-white text-blue-900 border-2 border-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
              style={{ fontFamily: 'var(--font-work-sans)' }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
>>>>>>> 3a2d265c66e5fecc44bc191693074c37250542fd
