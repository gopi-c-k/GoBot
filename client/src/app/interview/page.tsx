"use client"

import { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  Brain, 
  User, 
  Briefcase, 
  Code, 
  Users, 
  Target,
  Radio,
  Zap,
  MessageSquare
} from 'lucide-react';

export default function InterviewRoom() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeRecruiter, setActiveRecruiter] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Mock interview data
  const interviewData = {
    role: "Frontend Developer",
    round: "Technical Round",
    duration: "45 min"
  };

  // AI Recruiters with different specialties
  const recruiters = [
    {
      id: 1,
      name: "Alex Chen",
      specialty: "Technical Lead",
      avatar: "🤖",
      color: "from-blue-500 to-cyan-500",
      icon: Code
    },
    {
      id: 2,
      name: "Sarah Williams",
      specialty: "HR Specialist",
      avatar: "👩‍💼",
      color: "from-purple-500 to-pink-500",
      icon: Users
    },
    {
      id: 3,
      name: "David Kumar",
      specialty: "Project Manager",
      avatar: "📊",
      color: "from-green-500 to-emerald-500",
      icon: Target
    }
  ];

  // Mock questions
  const questions = [
    "Tell me about yourself and your experience with React.",
    "Explain the concept of closures in JavaScript with an example.",
    "How would you optimize the performance of a React application?",
    "Describe your experience with state management libraries."
  ];

  // Simulate audio level animation
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
    setAudioLevel(0);
  }, [isRecording]);

  // Simulate typing animation
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setCurrentQuestion(prev => (prev + 1) % questions.length);
        setActiveRecruiter(prev => (prev + 1) % recruiters.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  const handleMicToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsTyping(true);
      }, 2000);
    }
  };

  const WaveformBars = () => (
    <div className="flex items-center gap-1 h-12">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-100"
          style={{
            height: isRecording 
              ? `${Math.max(8, Math.random() * audioLevel)}%` 
              : '8px',
            opacity: isRecording ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Left Panel - Interview Details */}
      <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Mock Interview</h1>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Radio className="w-3 h-3" />
                <span>Live Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Info */}
        <div className="space-y-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-slate-300">Job Role</span>
            </div>
            <p className="text-white font-semibold">{interviewData.role}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-slate-300">Round Type</span>
            </div>
            <p className="text-white font-semibold">{interviewData.round}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-slate-300">Duration</span>
            </div>
            <p className="text-white font-semibold">{interviewData.duration}</p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Interview Status</span>
          </div>
          <p className="text-blue-300 text-sm">
            {isAnalyzing ? "Analyzing your response..." : 
             isTyping ? "Preparing next question..." : 
             isRecording ? "Recording your answer..." : "Ready for your response"}
          </p>
        </div>
      </div>

      {/* Right Panel - Interview Room */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* AI Recruiters Panel */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex justify-center gap-8">
            {recruiters.map((recruiter, index) => {
              const IconComponent = recruiter.icon;
              const isActive = index === activeRecruiter;
              
              return (
                <div
                  key={recruiter.id}
                  className={`relative group transition-all duration-500 ${
                    isActive ? 'scale-110' : 'scale-100 opacity-70'
                  }`}
                >
                  <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${recruiter.color} p-1 ${
                    isActive ? 'shadow-2xl shadow-blue-500/50' : ''
                  }`}>
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl">
                      {recruiter.avatar}
                    </div>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <h3 className="text-white font-semibold text-sm">{recruiter.name}</h3>
                    <p className="text-slate-400 text-xs">{recruiter.specialty}</p>
                  </div>

                  {isActive && isTyping && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Display */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-3xl text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 rounded-full px-4 py-2 mb-4">
                <span className="text-blue-300 text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              {isTyping ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  <span className="text-slate-400 ml-4">Preparing your question...</span>
                </div>
              ) : (
                <p className="text-2xl text-white leading-relaxed font-medium">
                  {questions[currentQuestion]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Audio Input Area */}
        <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Waveform Display */}
            <div className="mb-6">
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Audio Input</span>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm">
                      {isRecording ? "Recording..." : "Ready"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <WaveformBars />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleMicToggle}
                disabled={isAnalyzing}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 shadow-2xl shadow-red-500/50 hover:bg-red-600'
                    : 'bg-blue-500 shadow-2xl shadow-blue-500/50 hover:bg-blue-600'
                } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              >
                {isAnalyzing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isRecording ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              <div className="text-center">
                <p className="text-white text-sm font-medium">
                  {isRecording ? "Click to stop recording" : "Click to start recording"}
                </p>
                <p className="text-slate-400 text-xs">
                  {isAnalyzing ? "Processing your response..." : "Speak clearly into your microphone"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}