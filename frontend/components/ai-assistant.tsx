// frontend/components/ai-assistant.tsx

"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/router" // <-- This line has been updated for your project
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Plus, MessageSquare, Clock, User, Bot, Paperclip, Smile, Stethoscope, FileText } from "lucide-react"
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// --- TYPE DEFINITIONS ---
type Message = {
  sender: "user" | "ai"
  text: string
  timestamp: string
}

type ReportFormData = {
  symptoms: string
  duration: string
  severity: string
  medical_history: string
  additional_notes: string
}

const AIAssistant: React.FC = () => {
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportFormData, setReportFormData] = useState<ReportFormData>({
    symptoms: "",
    duration: "",
    severity: "",
    medical_history: "",
    additional_notes: "",
  })

  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const router = useRouter()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      // router.push('/auth/doctor-signin'); // You can re-enable this if needed
      setSessionId(crypto.randomUUID())
      setIsAuthenticating(false)
    } else {
      setSessionId(crypto.randomUUID())
      setIsAuthenticating(false)
    }
  }, [router])

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight)
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || !sessionId) return
    const userMessage: Message = {
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/doctor/chat/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { input: inputText },
          config: { configurable: { session_id: sessionId } },
        }),
      })
      if (!response.ok) throw new Error("Network response was not ok.")
      const result = await response.json()
      const aiMessage: Message = {
        sender: "ai",
        text: result.output?.output || result.output || "Sorry, I encountered an issue.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat API call failed:", error)
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I am having trouble connecting.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [inputText, sessionId, API_BASE_URL])

  const handleGenerateReport = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setIsReportModalOpen(false)
      const userMessage: Message = {
        sender: "user",
        text: `Generating report for symptoms: ${reportFormData.symptoms.substring(0, 50)}...`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, userMessage])

      try {
        const payload = { ...reportFormData, current_date: new Date().toISOString().split("T")[0] }
        const response = await fetch(`${API_BASE_URL}/api/doctor/generate-report/invoke`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: payload }),
        })
        if (!response.ok) throw new Error("Network response was not ok.")
        const result = await response.json()
        const aiMessage: Message = {
          sender: "ai",
          text: result.output?.output || "Sorry, I could not generate the report.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, aiMessage])
      } catch (error) {
        console.error("Report generation failed:", error)
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Sorry, there was an error generating the report.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      } finally {
        setIsLoading(false)
        setReportFormData({ symptoms: "", duration: "", severity: "", medical_history: "", additional_notes: "" })
      }
    },
    [reportFormData, API_BASE_URL],
  )

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <Stethoscope className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-sidebar-foreground">Doctor&apos;s Co-Pilot</h2>
              <p className="text-sm text-muted-foreground">AI Medical Assistant</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setMessages([])
              setSessionId(crypto.randomUUID())
            }}
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-4">
            <Button
              onClick={() => setIsReportModalOpen(true)}
              variant="outline"
              className="w-full justify-start border-sidebar-border hover:bg-sidebar-accent/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Full Report
            </Button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sidebar-foreground mb-3">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Recent Chats</span>
              </div>

              <div className="space-y-1">
                <div className="p-3 rounded-lg hover:bg-sidebar-accent/10 cursor-pointer text-sidebar-foreground text-sm border border-sidebar-border/50">
                  Fever and headache symptoms
                </div>
                <div className="p-3 rounded-lg hover:bg-sidebar-accent/10 cursor-pointer text-sidebar-foreground text-sm border border-sidebar-border/50">
                  Chest pain consultation
                </div>
                <div className="p-3 rounded-lg hover:bg-sidebar-accent/10 cursor-pointer text-sidebar-foreground text-sm border border-sidebar-border/50">
                  Medication side effects
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/10 border border-sidebar-border/50">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground">Welcome Doctor</p>
              <p className="text-xs text-muted-foreground truncate">Medical Professional</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Health Assistant</h1>
                <p className="text-sm text-muted-foreground">Online • Ready to help with medical queries</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-4xl h-full bg-card rounded-lg shadow-sm border border-border flex flex-col">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Stethoscope className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Doctor&apos;s AI Co-Pilot</h1>
                  <p className="text-balance max-w-md">
                    Ask a clinical question, describe symptoms, or use the &quot;Generate Full Report&quot; feature for
                    comprehensive analysis.
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <Card
                    className={`max-w-[70%] p-4 ${msg.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card text-card-foreground border border-border"
                      }`}
                  >
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 whitespace-pre-wrap">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <p
                      className={`text-xs mt-2 text-right ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                    >
                      {msg.timestamp}
                    </p>
                  </Card>

                  {msg.sender === "user" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="bg-card text-card-foreground p-4 border border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">AI is analyzing...</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card border-t border-border p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a follow-up, or describe symptoms..."
                  className="pr-20 min-h-[48px] bg-input border-border focus:ring-2 focus:ring-ring"
                  disabled={isLoading}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-[48px] px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI assistant provides general health information and is not a substitute for professional medical
              advice.
            </p>
          </div>
        </div>
      </div>

      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Generate Diagnostic Report</h2>
            </div>

            <form onSubmit={handleGenerateReport}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Patient Symptoms</label>
                  <textarea
                    name="symptoms"
                    value={reportFormData.symptoms}
                    onChange={handleFormChange}
                    placeholder="Describe the patient's symptoms in detail..."
                    className="w-full p-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                    <Input
                      type="text"
                      name="duration"
                      value={reportFormData.duration}
                      onChange={handleFormChange}
                      placeholder="e.g., 3 days, 2 weeks"
                      className="bg-input border-border focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
                    <Input
                      type="text"
                      name="severity"
                      value={reportFormData.severity}
                      onChange={handleFormChange}
                      placeholder="e.g., 8/10, moderate"
                      className="bg-input border-border focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Medical History</label>
                  <textarea
                    name="medical_history"
                    value={reportFormData.medical_history}
                    onChange={handleFormChange}
                    placeholder="Relevant medical history, medications, allergies..."
                    className="w-full p-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                  <textarea
                    name="additional_notes"
                    value={reportFormData.additional_notes}
                    onChange={handleFormChange}
                    placeholder="Any additional observations or notes..."
                    className="w-full p-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-ring focus:border-transparent"
                    rows={2}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsReportModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Generate Report
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

export default AIAssistant