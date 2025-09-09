'use client';

import { useState } from 'react';
import Link from 'next/link';

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const DeleteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
<svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2142 6.896C15.4102 3.396 20.2462 3.29 21.6642 6.578L21.7842 6.898L23.3982 11.618C23.7681 12.7005 24.3658 13.691 25.1511 14.5228C25.9363 15.3547 26.8908 16.0084 27.9502 16.44L28.3842 16.602L33.1042 18.214C36.6042 19.41 36.7102 24.246 33.4242 25.664L33.1042 25.784L28.3842 27.398C27.3014 27.7676 26.3104 28.3653 25.4782 29.1505C24.6461 29.9358 23.992 30.8904 23.5602 31.95L23.3982 32.382L21.7862 37.104C20.5902 40.604 15.7542 40.71 14.3382 37.424L14.2142 37.104L12.6022 32.384C12.2326 31.3012 11.635 30.3102 10.8497 29.478C10.0644 28.6459 9.10979 27.9918 8.05021 27.56L7.61821 27.398L2.89821 25.786C-0.603791 24.59 -0.709791 19.754 2.57821 18.338L2.89821 18.214L7.61821 16.602C8.70068 16.2321 9.69123 15.6344 10.5231 14.8491C11.3549 14.0639 12.0086 13.1094 12.4402 12.05L12.6022 11.618L14.2142 6.896ZM34.0002 3.61375e-07C34.3744 -4.71944e-07 34.741 0.104957 35.0585 0.302943C35.376 0.50093 35.6316 0.784005 35.7962 1.12L35.8922 1.354L36.5922 3.406L38.6462 4.106C39.0212 4.23339 39.3499 4.46923 39.5907 4.78363C39.8315 5.09803 39.9735 5.47684 39.9988 5.87204C40.024 6.26725 39.9314 6.66106 39.7326 7.00357C39.5339 7.34609 39.2379 7.62188 38.8822 7.796L38.6462 7.892L36.5942 8.592L35.8942 10.646C35.7666 11.0209 35.5306 11.3494 35.2161 11.59C34.9015 11.8306 34.5227 11.9724 34.1275 11.9974C33.7323 12.0225 33.3386 11.9297 32.9962 11.7308C32.6538 11.5318 32.3782 11.2357 32.2042 10.88L32.1082 10.646L31.4082 8.594L29.3542 7.894C28.9792 7.76661 28.6505 7.53077 28.4098 7.21637C28.169 6.90197 28.0269 6.52316 28.0017 6.12796C27.9764 5.73275 28.069 5.33894 28.2678 4.99643C28.4665 4.65391 28.7625 4.37812 29.1182 4.204L29.3542 4.108L31.4062 3.408L32.1062 1.354C32.2411 0.958851 32.4962 0.615817 32.8359 0.372998C33.1755 0.130178 33.5827 -0.000250563 34.0002 3.61375e-07Z" fill="black"/>
</svg>

);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function SymptomChecker() {
  const [symptomText, setSymptomText] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{id: string, title: string, date: string}>>([]);

  const handleSendSymptom = () => {
    
    console.log('Send symptom:', symptomText);
    setSymptomText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendSymptom();
    }
  };

  const handleNewChat = () => {

    console.log('Starting new chat');
  };

  const handleDeleteChat = () => {
    
    console.log('Deleting chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      <div className="w-full md:w-1/4 bg-blue-900 p-4 flex flex-col">
        
        <div className="mb-4">
          <div className="w-8 h-8 border border-white rounded flex items-center justify-center">
            <MenuIcon className="w-4 h-4 text-white" />
          </div>
        </div>

    
        <button
          onClick={handleNewChat}
          className="w-full mb-3 px-4 py-3 rounded-md text-black transition-colors"
          style={{ backgroundColor: '#8e9ded', fontFamily: 'var(--font-work-sans)' }}
        >
          New Chat
        </button>

    
        <button
          className="w-full mb-4 px-4 py-3 bg-transparent border border-white rounded-md text-black hover:bg-blue-800 transition-colors"
          style={{ backgroundColor: '#8e9ded', fontFamily: 'var(--font-work-sans)' }}
        >
          Recent Chats
        </button>

        
        <div className="flex-1 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <p className="text-blue-200 text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
              No recent chats
            </p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="mb-2 p-3 bg-blue-800 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <p className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {chat.title}
                </p>
                <p className="text-blue-200 text-xs" style={{ fontFamily: 'var(--font-work-sans)' }}>
                  {chat.date}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      
      <div className="w-full md:w-3/4 flex flex-col">
    
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <Link 
            href="/PatientPortal"
            className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Back to Portal
            </span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDeleteChat}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Delete Chat"
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
            
            <button
              className="pl-3 pr-12 py-2 bg-white border-4 border-blue-900 rounded-md text-blue-900 hover:bg-blue-50 transition-colors flex justify-start items-center"
              title="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </div>


        <div className="flex-1 flex flex-col items-center justify-center p-8">
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <StarIcon className="w-16 h-16 text-yellow-400 mr-4" />
              <h1 className="text-3xl font-bold text-black" style={{ fontFamily: 'var(--font-work-sans)' }}>
                AI Health Assistant
              </h1>
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-work-sans)' }}>
              Describe your symptoms and get personalized health insights
            </p>
          </div>

    
          <div className="w-full max-w-4xl flex-1 mb-8 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
              <div className="space-y-4">
            
                <div className="flex justify-end">
                  <div className="max-w-3xl rounded-lg px-4 py-3 bg-blue-600 text-white">
                    <div className="flex items-start space-x-2">
                      <div className="flex-1">
                        <p className="text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          I&apos;ve been experiencing headaches and fatigue for the past few days.
                        </p>
                        <p className="text-xs mt-1 text-blue-100" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          2:45 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

    
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-lg px-4 py-3 bg-gray-100 text-gray-900 border border-gray-200">
                    <div className="flex items-start space-x-2">
                      <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          Thank you for describing your symptoms. Headaches and fatigue can have various causes. 
                          Please remember this is general information only - consult with a healthcare professional for proper evaluation.
                        </p>
                        <p className="text-xs mt-1 text-gray-500" style={{ fontFamily: 'var(--font-work-sans)' }}>
                          2:46 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="text-center text-gray-400 mt-8 pt-4 border-t border-gray-200">
                  <p className="text-sm" style={{ fontFamily: 'var(--font-work-sans)' }}>
                    <em>Type your symptoms below to start a conversation</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your Symptoms"
                className="w-full px-4 py-2 pr-12 border-2 border-blue-900 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
                style={{ fontFamily: 'var(--font-work-sans)' }}
                rows={1}
              />
              
              <button
                onClick={handleSendSymptom}
                disabled={!symptomText.trim()}
                className="absolute bottom-2 right-2 p-1.5 bg-white text-blue-900 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors border border-gray-300"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}