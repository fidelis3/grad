'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CrisisContactForm } from './components/CrisisContactForm';
import { MenuIcon, DeleteIcon, StarIcon, SendIcon } from './components/Icons';

type Message = {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string; // human-friendly time (HH:MM:SS)
  isoTime: string; // ISO time for computations
  latencyMs?: number; // for AI messages (difference between user send and this response)
};

type ChatSession = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
};

export type CrisisFormData = {
  name: string;
  email: string;
  message: string;
};

const STORAGE_KEY = 'medai_sessions_v1';

export default function SymptomCheckerPage() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<Record<string, ChatSession>>({});
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [crisisMessage, setCrisisMessage] = useState('');

  const [mode, setMode] = useState<'symptom' | 'appointment'>('symptom');

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://medai-91bj.onrender.com';

  // ---- Utilities ----
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  const createEmptySession = useCallback(() => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const session: ChatSession = {
      id,
      title: 'New chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    setSessions((prev) => ({ ...prev, [id]: session }));
    setSessionId(id);
    setMessages([]);
  }, []);

  // ---- Load sessions from storage on mount ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Record<string, ChatSession> = JSON.parse(raw);
        setSessions(parsed);

        // pick most recently updated session
        const values = Object.values(parsed);
        if (values.length > 0) {
          values.sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));
          const latest = values[0];
          setSessionId(latest.id);
          setMessages(latest.messages ?? []);
        } else {
          createEmptySession();
        }
      } else {
        createEmptySession();
      }
    } catch (e) {
      console.error('Failed to load sessions from storage', e);
      createEmptySession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Persist sessions whenever they change ----
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to persist sessions', e);
    }

    // Update chatHistory summary list
    const items = Object.values(sessions)
      .slice()
      .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
      .map((s) => ({
        id: s.id,
        title: s.title,
        date: new Date(s.updatedAt).toLocaleString(),
      }));
    setChatHistory(items);
  }, [sessions]);

  // ---- Keep the current session updated whenever messages change ----
  useEffect(() => {
    if (!sessionId) return;
    setSessions((prev) => {
      const prevSession = prev[sessionId];
      const now = new Date().toISOString();
      const updatedSession: ChatSession = {
        id: sessionId,
        title:
          messages.length > 0
            ? (messages.find((m) => m.sender === 'user')?.text ?? messages[0].text).slice(0, 60) +
            (messages.length > 0 ? '...' : '')
            : prevSession?.title ?? 'New chat',
        createdAt: prevSession?.createdAt ?? now,
        updatedAt: now,
        messages,
      };
      return { ...prev, [sessionId]: updatedSession };
    });
  }, [messages, sessionId]);

  // ---- Scroll to bottom when messages change ----
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ---- Create new chat (button) ----
  const handleNewChat = useCallback(() => {
    createEmptySession();
  }, [createEmptySession]);

  // ---- Select a saved chat from sidebar ----
  const handleSelectChat = (id: string) => {
    const s = sessions[id];
    if (!s) return;
    setSessionId(id);
    setMessages(s.messages ?? []);
  };

  // ---- Delete (clear) the current chat's messages ----
  const handleDeleteChat = () => {
    if (!sessionId) {
      setMessages([]);
      return;
    }
    // clear messages in UI
    setMessages([]);
    // clear in sessions map
    setSessions((prev) => {
      const copy = { ...prev };
      if (copy[sessionId]) {
        copy[sessionId] = { ...copy[sessionId], messages: [], updatedAt: new Date().toISOString() };
      }
      return copy;
    });
  };

  // ---- Parse AI response helper ----
  type AIResponse = {
    output?: {
      output?: string;
      empathetic_message?: string;
      action?: string;
    };
    reply?: string;
  };

  const parseAIResponse = (result: AIResponse): string => {
    if (!result) return 'I received an empty response.';
    if (typeof result.output?.output === 'string') return result.output.output;
    if (typeof result.output === 'string') return result.output;
    if (typeof result.reply === 'string') return result.reply;
    return 'I received a response, but could not read its content.';
  };

  // ---- Send message (symptom or appointment) ----
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // ensure we have a session
    if (!sessionId) {
      createEmptySession();
      // allow sessionId to be set by effect; but we'll continue using a local id fallback
    }

    const sendIso = new Date().toISOString();
    const userMessage: Message = {
      sender: 'user',
      text: inputText,
      timestamp: formatTime(sendIso),
      isoTime: sendIso,
    };

    // append user message immediately
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (mode === 'symptom') {
        response = await fetch(`${API_BASE_URL}/api/patient/chat/invoke`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            input: { input: currentInput },
            config: { configurable: { session_id: sessionId } },
          }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/appointment/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId: sessionId, query: currentInput }),
        });
      }

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const result: AIResponse = await response.json();

      // if crisis action - open modal but still capture AI text
      let aiText = '';
      if (result.output?.action === 'collect_crisis_details') {
        const empathetic = result.output.empathetic_message ?? parseAIResponse(result);
        setCrisisMessage(empathetic);
        setIsCrisisModalOpen(true);
        aiText = empathetic;
      } else {
        aiText = parseAIResponse(result);
      }

      // mark response time and compute latency relative to last user send
      const respIso = new Date().toISOString();
      const latencyMs = Math.max(0, new Date(respIso).getTime() - new Date(sendIso).getTime());

      const aiMessage: Message = {
        sender: 'ai',
        text: aiText,
        timestamp: formatTime(respIso),
        isoTime: respIso,
        latencyMs,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sorry, I seem to be having trouble connecting.',
          timestamp: formatTime(new Date().toISOString()),
          isoTime: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Crisis form submission (same as before) ----
  const handleCrisisFormSubmit = async (formData: CrisisFormData) => {
    setIsCrisisModalOpen(false);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/report-crisis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit crisis report.');

      const confirmationMessage: Message = {
        sender: 'ai',
        text: 'Thank you for reaching out. Your request has been sent, and a professional will be in contact with you shortly.',
        timestamp: formatTime(new Date().toISOString()),
        isoTime: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, confirmationMessage]);
    } catch (error) {
      console.error('Crisis report submission failed:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I am sorry, there was an error sending your request. Please contact a crisis hotline directly.',
          timestamp: formatTime(new Date().toISOString()),
          isoTime: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Input keypress handler ----
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ---- Render ----
  return (
    <div className="h-screen flex bg-gray-50 font-sans overflow-hidden">
      {isCrisisModalOpen && (
        <CrisisContactForm
          empatheticMessage={crisisMessage}
          onFormSubmit={handleCrisisFormSubmit}
          onCancel={() => setIsCrisisModalOpen(false)}
        />
      )}

      {/* Sidebar (fixed on md and up) */}
      <aside className="w-full md:w-72 bg-blue-900 p-4 flex flex-col text-white md:fixed md:inset-y-0 md:left-0">
        <div className="mb-4 flex justify-between items-center">
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

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('symptom')}
            className={`flex-1 px-3 py-2 rounded ${mode === 'symptom' ? 'bg-blue-600 text-white' : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
              }`}
          >
            Symptom
          </button>
          <button
            onClick={() => setMode('appointment')}
            className={`flex-1 px-3 py-2 rounded ${mode === 'appointment' ? 'bg-green-600 text-white' : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
              }`}
          >
            Appointment
          </button>
        </div>

        {/* Recent chats scroll independently within sidebar */}
        <div className="flex-1 overflow-y-auto mt-4">
          <h2 className="text-sm font-semibold text-blue-200 mb-2">Recent Chats</h2>

          {chatHistory.length === 0 ? (
            <p className="text-blue-200 text-sm">No recent chats</p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`mb-2 p-3 rounded-md cursor-pointer hover:bg-blue-700 transition-colors ${chat.id === sessionId ? 'bg-blue-800' : 'bg-blue-800/80'
                  }`}
              >
                <p className="text-white text-sm font-medium truncate">{chat.title}</p>
                <p className="text-blue-200 text-xs">{chat.date}</p>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Chat Area (offset on md to account for fixed sidebar) */}
      <main className="flex-1 flex flex-col min-h-0 md:ml-72">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-end items-center space-x-3">
          <button
            onClick={handleDeleteChat}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Delete Chat"
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Center content */}
        <section className="flex-1 flex flex-col p-4 sm:p-8 min-h-0">
          {messages.length === 0 && !isLoading && (
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <StarIcon className="w-16 h-16 text-black" />
                <h1 className="text-3xl font-bold text-black ml-4">AI Health Assistant</h1>
              </div>
              <p className="text-gray-600">
                {mode === 'appointment' ? 'Book an appointment with a doctor' : 'Describe your symptoms and get personalized health insights'}
              </p>
            </div>
          )}

          <div className="w-full max-w-4xl flex-1 mb-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-0">
            {/* This inner container is the only scrollable messages area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-3xl rounded-lg px-4 py-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start space-x-2">
                        {msg.sender === 'ai' && <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />}
                        <div className="flex-1 prose prose-sm max-w-none">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>

                      {/* Timestamp / latency row */}
                      <div className={`mt-2 text-xs ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                        {msg.sender === 'user' ? (
                          <span>Sent at {msg.timestamp}</span>
                        ) : (
                          <span>
                            Responded at {msg.timestamp}
                            {typeof msg.latencyMs === 'number' ? ` • ${(msg.latencyMs / 1000).toFixed(2)}s` : ''}
                          </span>
                        )}
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
        </section>

        {/* Input area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={mode === 'appointment' ? 'Type to book an appointment...' : 'Describe your symptoms...'}
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
      </main>
    </div>
  );
}
