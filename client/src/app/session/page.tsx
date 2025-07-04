"use client"

import { useState } from "react";
import { VerticalNavbar } from "@/components/navbar";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { 
  Calendar, Clock, User, FileText, Download, Play, Pause, Volume2,
  TrendingUp, Target, Brain, Mic, Award, Tag, AlertCircle, CheckCircle,
  ChevronRight, Search, Filter, MoreVertical, Share, Trash2, Edit,
  Sparkles, ArrowRight, BarChart3, Eye, Headphones
} from "lucide-react";

export default function SessionHistory() {
  const [activeNavItem, setActiveNavItem] = useState("history");
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioQuestion, setCurrentAudioQuestion] = useState(null);

  const handleNavClick = (itemId) => {
    if (itemId === "logout") {
      console.log("Logging out...");
      return;
    }
    setActiveNavItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  // Sample session data
  const sessions = [
    {
      id: 1,
      title: "Frontend Round 2",
      date: "2025-07-03",
      time: "14:30",
      duration: "14 mins",
      role: "Frontend Developer",
      round: "Technical",
      resume: "john_doe_resume_v2.pdf",
      overallScore: 87,
      confidenceScore: 85,
      clarityScore: 90,
      technicalScore: 86,
      wpmAvg: 155,
      strengthTags: ["React", "GraphQL", "TypeScript", "CSS Grid"],
      weaknessTags: ["Time Complexity", "System Design"],
      status: "completed"
    },
    {
      id: 2,
      title: "Backend System Design",
      date: "2025-07-01",
      time: "10:15",
      duration: "18 mins",
      role: "Backend Developer",
      round: "System Design",
      resume: "john_doe_resume_v2.pdf",
      overallScore: 76,
      confidenceScore: 72,
      clarityScore: 78,
      technicalScore: 78,
      wpmAvg: 142,
      strengthTags: ["Microservices", "Docker", "API Design"],
      weaknessTags: ["Load Balancing", "Database Scaling"],
      status: "completed"
    },
    {
      id: 3,
      title: "HR Behavioral Round",
      date: "2025-06-28",
      time: "16:45",
      duration: "12 mins",
      role: "Full Stack Developer",
      round: "HR",
      resume: "john_doe_resume_v1.pdf",
      overallScore: 92,
      confidenceScore: 94,
      clarityScore: 88,
      technicalScore: 94,
      wpmAvg: 148,
      strengthTags: ["Communication", "Leadership", "Problem Solving"],
      weaknessTags: ["Conflict Resolution"],
      status: "completed"
    },
    {
      id: 4,
      title: "Data Science Technical",
      date: "2025-06-25",
      time: "11:30",
      duration: "20 mins",
      role: "Data Scientist",
      round: "Technical",
      resume: "john_doe_resume_v1.pdf",
      overallScore: 68,
      confidenceScore: 65,
      clarityScore: 70,
      technicalScore: 70,
      wpmAvg: 138,
      strengthTags: ["Python", "Machine Learning", "Statistics"],
      weaknessTags: ["Deep Learning", "Model Deployment", "SQL Optimization"],
      status: "completed"
    },
    {
      id: 5,
      title: "Mobile Development",
      date: "2025-06-22",
      time: "09:00",
      duration: "16 mins",
      role: "Mobile Developer",
      round: "Technical",
      resume: "john_doe_resume_v1.pdf",
      overallScore: 81,
      confidenceScore: 78,
      clarityScore: 84,
      technicalScore: 82,
      wpmAvg: 151,
      strengthTags: ["React Native", "Flutter", "iOS"],
      weaknessTags: ["Android Native", "Performance Optimization"],
      status: "completed"
    }
  ];

  const questionAnswers = [
    {
      id: 1,
      question: "What is React Virtual DOM and how does it improve performance?",
      answer: "The Virtual DOM is a JavaScript representation of the real DOM. React uses it to optimize updates by comparing the current Virtual DOM with the previous version, a process called reconciliation. This allows React to make minimal changes to the actual DOM, which is expensive to manipulate directly.",
      feedback: "Good answer! You covered the key concepts well. Minor pause detected around 'reconciliation' - try to maintain flow. Consider mentioning the diffing algorithm for a more complete answer.",
      confidence: 85,
      clarity: 88,
      technical: 90,
      duration: "1:45",
      wpm: 152,
      fillerWords: 2
    },
    {
      id: 2,
      question: "How would you handle state management in a large React application?",
      answer: "For large applications, I'd use Redux or Zustand for global state management. I'd keep local state in components when possible and use Context API for medium-complexity state sharing. For server state, I'd use React Query or SWR to handle caching and synchronization.",
      feedback: "Excellent comprehensive answer! You mentioned multiple solutions appropriately. Good speaking pace and clarity. Could elaborate on when to choose each solution.",
      confidence: 90,
      clarity: 92,
      technical: 88,
      duration: "2:10",
      wpm: 158,
      fillerWords: 1
    },
    {
      id: 3,
      question: "Explain the difference between useEffect and useLayoutEffect.",
      answer: "useEffect runs after the DOM has been updated and painted, making it asynchronous. useLayoutEffect runs synchronously after DOM mutations but before painting, which can cause blocking. Use useLayoutEffect when you need to read layout and synchronously re-render.",
      feedback: "Very good technical explanation! You understood the timing differences well. Consider mentioning specific use cases where useLayoutEffect is preferred.",
      confidence: 82,
      clarity: 85,
      technical: 92,
      duration: "1:30",
      wpm: 160,
      fillerWords: 0
    }
  ];

  const wpmTrendData = [
    { question: 'Q1', wpm: 152 },
    { question: 'Q2', wpm: 158 },
    { question: 'Q3', wpm: 160 },
    { question: 'Q4', wmp: 155 },
    { question: 'Q5', wpm: 148 }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || session.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 85) return "bg-green-500/20 border-green-500/30";
    if (score >= 70) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  const toggleAudio = (questionId) => {
    if (currentAudioQuestion === questionId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudioQuestion(questionId);
      setIsPlaying(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <VerticalNavbar
        activeItem={activeNavItem}
        onItemClick={handleNavClick}
      />

      <div className="pl-25 flex h-screen relative z-10">
        {/* Left Panel - Session List */}
        <div className="w-96 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Session History</h2>
                <p className="text-slate-400 text-sm">{sessions.length} total sessions</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Mobile Developer">Mobile Developer</option>
              </select>
            </div>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  selectedSession?.id === session.id ? 'bg-white/10 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm truncate">{session.title}</h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{session.date}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{session.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getScoreBg(session.overallScore)}`}>
                    {session.role}
                  </span>
                  <span className={`text-sm font-semibold ${getScoreColor(session.overallScore)}`}>
                    {session.overallScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Session Details */}
        <div className="flex-1 overflow-y-auto">
          {selectedSession ? (
            <div className="p-6 space-y-6">
              {/* Session Header */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{selectedSession.title}</h1>
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedSession.date} at {selectedSession.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedSession.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <Share className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <Download className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{selectedSession.overallScore}%</div>
                    <div className="text-xs text-slate-400">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{selectedSession.confidenceScore}%</div>
                    <div className="text-xs text-slate-400">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{selectedSession.clarityScore}%</div>
                    <div className="text-xs text-slate-400">Clarity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{selectedSession.technicalScore}%</div>
                    <div className="text-xs text-slate-400">Technical</div>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Session Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className="text-white">{selectedSession.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Round Type:</span>
                      <span className="text-white">{selectedSession.round}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Resume:</span>
                      <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{selectedSession.resume}</span>
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg WPM:</span>
                      <span className="text-white">{selectedSession.wpmAvg}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">WPM Trend</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={wpmTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="question" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line type="monotone" dataKey="wpm" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Strengths</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.strengthTags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white">Areas for Improvement</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.weaknessTags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Feedback */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">AI Feedback & Tips</h3>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                  <p className="text-white mb-3">
                    <strong>Overall Performance:</strong> Great job on this session! Your confidence has improved significantly, and your technical answers show solid understanding.
                  </p>
                  <p className="text-slate-300 mb-3">
                    <strong>Key Recommendations:</strong>
                  </p>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• Focus on time complexity explanations in algorithm questions</li>
                    <li>• Practice system design scenarios with load balancing concepts</li>
                    <li>• Try to reduce pause time between questions by 10-15%</li>
                    <li>• Consider elaborating on trade-offs when discussing technical solutions</li>
                  </ul>
                </div>
              </div>

              {/* Question-wise Review */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Question-wise Review</h3>
                </div>
                
                <div className="space-y-6">
                  {questionAnswers.map((qa, index) => (
                    <div key={qa.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-white text-sm leading-relaxed pr-4">
                          Q{index + 1}: {qa.question}
                        </h4>
                        <button 
                          onClick={() => toggleAudio(qa.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex-shrink-0"
                        >
                          {currentAudioQuestion === qa.id && isPlaying ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          <span className="text-xs">Audio</span>
                        </button>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Mic className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium text-green-400">Your Answer:</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{qa.answer}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-4 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-medium text-blue-400">AI Feedback:</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{qa.feedback}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
                        <div className="text-center">
                          <div className={`font-semibold ${getScoreColor(qa.confidence)}`}>{qa.confidence}%</div>
                          <div className="text-slate-400">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${getScoreColor(qa.clarity)}`}>{qa.clarity}%</div>
                          <div className="text-slate-400">Clarity</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${getScoreColor(qa.technical)}`}>{qa.technical}%</div>
                          <div className="text-slate-400">Technical</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{qa.wmp}</div>
                          <div className="text-slate-400">WPM</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{qa.fillerWords}</div>
                          <div className="text-slate-400">Filler Words</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{qa.duration}</div>
                          <div className="text-slate-400">Duration</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transcript Section */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-semibold text-white">Full Session Transcript</h3>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    [00:00] <strong>Interviewer:</strong> Hello! Welcome to your technical interview. Let's start with our first question about React Virtual DOM...<br/><br/>
                    [00:15] <strong>You:</strong> The Virtual DOM is a JavaScript representation of the real DOM. React uses it to optimize updates by comparing the current Virtual DOM with the previous version, a process called reconciliation...<br/><br/>
                    [02:00] <strong>Interviewer:</strong> That's a great explanation! Now, let's move on to state management. How would you handle state in a large React application?<br/><br/>
                    [02:15] <strong>You:</strong> For large applications, I'd use Redux or Zustand for global state management. I'd keep local state in components when possible...<br/><br/>
                    <em className="text-slate-400">Continue reading transcript...</em>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a Session</h3>
                <p className="text-slate-400">Choose a session from the left panel to view detailed analysis and feedback</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}