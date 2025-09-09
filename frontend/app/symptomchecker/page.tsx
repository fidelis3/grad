'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
};

type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
};

// --- SVG ICONS ---
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
    <path d="M14.2142 6.896C15.4102 3.396 20.2462 3.29 21.6642 6.578L21.7842 6.898L23.3982 11.618C23.7681 12.7005 24.3658 13.691 25.1511 14.5228C25.9363 15.3547 26.8908 16.0084 27.9502 16.44L28.3842 16.602L33.1042 18.214C36.6042 19.41 36.7102 24.246 33.4242 25.664L33.1042 25.784L28.3842 27.398C27.3014 27.7676 26.3104 28.3653 25.4782 29.1505C24.6461 29.9358 23.992 30.8904 23.5602 31.95L23.3982 32.382L21.7862 37.104C20.5902 40.604 15.7542 40.71 14.3382 37.424L14.2142 37.104L12.6022 32.384C12.2326 31.3012 11.635 30.3102 10.8497 29.478C10.0644 28.6459 9.10979 27.9918 8.05021 27.56L7.61821 27.398L2.89821 25.786C-0.603791 24.59 -0.709791 19.754 2.57821 18.338L2.89821 18.214L7.61821 16.602C8.70068 16.2321 9.69123 15.6344 10.5231 14.8491C11.3549 14.0639 12.0086 13.1094 12.4402 12.05L12.6022 11.618L14.2142 6.896ZM34.0002 3.61375e-07C34.3744 -4.71944e-07 34.741 0.104957 35.0585 0.302943C35.376 0.50093 35.6316 0.784005 35.7962 1.12L35.8922 1.354L36.5922 3.406L38.6462 4.106C39.0212 4.23339 39.3499 4.46923 39.5907 4.78363C39.8315 5.09803 39.9735 5.47684 39.9988 5.87204C40.024 6.26725 39.9314 6.66106 39.7326 7.00357C39.5339 7.34609 39.2379 7.62188 38.8822 7.796L38.6462 7.892L36.5942 8.592L35.8942 10.646C35.7666 11.0209 35.5306 11.3494 35.2161 11.59C34.9015 11.8306 34.5227 11.9724 34.1275 11.9974C33.7323 12.0225 33.3386 11.9297 32.9962 11.7308C32.6538 11.5318 32.3782 11.2357 32.2042 10.88L32.1082 10.646L31.4082 8.594L29.3542 7.894C28.9792 7.76661 28.6505 7.53077 28.4098 7.21637C28.169 6.90197 28.0269 6.52316 28.0017 6.12796C27.9764 5.73275 28.069 5.33894 28.2678 4.99643C28.4665 4.65391 28.7625 4.37812 29.1182 4.204L29.3542 4.108L31.4062 3.408L32.1062 1.354C32.2411 0.958851 32.4962 0.615817 32.8359 0.372998C33.1755 0.130178 33.5827 -0.000250563 34.0002 3.61375e-07Z" fill="black" />
  </svg>
);
const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default function SymptomChecker() {
  // --- STATE MANAGEMENT ---
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    handleNewChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !sessionId) return;

    const userMessage: Message = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    const chatApiUrl = `${API_BASE_URL}/api/patient/chat/invoke`;

    try {
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },

        body: JSON.stringify({
          input: {
            input: inputText,
          },
          config: {
            configurable: {
              session_id: sessionId,
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();

      const aiMessage: Message = {
        sender: 'ai',
        text: result.output?.output || 'I received a response, but it was empty.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMsg);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, I seem to be having trouble connecting. Please try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    setMessages([]);
    setError(null);

    if (messages.length > 0 && sessionId) {
      const newHistoryItem: ChatHistoryItem = {
        id: sessionId,
        title: messages[0].text.substring(0, 30) + '...',
        date: new Date().toLocaleDateString(),
      };
      setChatHistory(prev => [newHistoryItem, ...prev]);
    }
  };

  const handleDeleteChat = () => {
    setMessages([]);
    console.log('Deleting current chat messages');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      <div className="w-full md:w-1/4 bg-blue-900 p-4 flex flex-col text-white">
        <div className="mb-4">
          <div className="w-8 h-8 border border-white rounded flex items-center justify-center">
            <MenuIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        <button
          onClick={handleNewChat}
          className="w-full mb-3 px-4 py-3 rounded-md bg-white text-blue-900 font-semibold hover:bg-gray-200 transition-colors"
        >
          + New Chat
        </button>
        <div className="flex-1 overflow-y-auto mt-4">
          <h2 className="text-sm font-semibold text-blue-200 mb-2">Recent Chats</h2>
          {chatHistory.length === 0 ? (
            <p className="text-blue-200 text-sm">No recent chats</p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="mb-2 p-3 bg-blue-800 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <p className="text-white text-sm font-medium truncate">{chat.title}</p>
                <p className="text-blue-200 text-xs">{chat.date}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full md:w-3/4 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex justify-end items-center space-x-3">
          <button
            onClick={handleDeleteChat}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Delete Chat"
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">

          {messages.length === 0 && !isLoading && (
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <StarIcon />
                <h1 className="text-3xl font-bold text-black ml-4">
                  AI Health Assistant
                </h1>
              </div>
              <p className="text-gray-600">
                Describe your symptoms and get personalized health insights
              </p>
            </div>
          )}

          <div className="w-full max-w-4xl flex-1 mb-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">

              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl rounded-lg px-4 py-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}>
                    <div className="flex items-start space-x-2">
                      {msg.sender === 'ai' && <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{msg.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-lg px-4 py-3 bg-gray-100 text-gray-900 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0 animate-pulse" />
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms..."
                className="w-full px-4 py-2 pr-12 border-2 border-blue-900 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="absolute bottom-2 right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


