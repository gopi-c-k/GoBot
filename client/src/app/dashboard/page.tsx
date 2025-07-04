"use client"

import { useState } from "react";
import { VerticalNavbar } from "@/components/navbar";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, Clock, Volume2, Target, Calendar, Users, 
  Lightbulb, Award, FileText, Sparkles, ArrowUp, ArrowDown,
  Brain, Mic, Eye, BookOpen
} from "lucide-react";

export default function Dashboard() {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  const handleNavClick = (itemId) => {
    if (itemId === "logout") {
      console.log("Logging out...");
      return;
    }
    setActiveNavItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  // Sample data for charts
  const confidenceData = [
    { session: 'Session 1', confidence: 65, date: '2024-01-01' },
    { session: 'Session 2', confidence: 72, date: '2024-01-03' },
    { session: 'Session 3', confidence: 68, date: '2024-01-05' },
    { session: 'Session 4', confidence: 78, date: '2024-01-07' },
    { session: 'Session 5', confidence: 85, date: '2024-01-10' },
    { session: 'Session 6', confidence: 82, date: '2024-01-12' },
    { session: 'Session 7', confidence: 88, date: '2024-01-15' },
  ];

  const wpmData = [
    { session: 'S1', wpm: 120, target: 145 },
    { session: 'S2', wpm: 135, target: 145 },
    { session: 'S3', wpm: 128, target: 145 },
    { session: 'S4', wpm: 142, target: 145 },
    { session: 'S5', wpm: 148, target: 145 },
    { session: 'S6', wpm: 151, target: 145 },
    { session: 'S7', wpm: 155, target: 145 },
  ];

  const clarityData = [
    { session: 'Session 1', clarity: 75, fillerWords: 12 },
    { session: 'Session 2', clarity: 78, fillerWords: 8 },
    { session: 'Session 3', clarity: 82, fillerWords: 6 },
    { session: 'Session 4', clarity: 85, fillerWords: 4 },
    { session: 'Session 5', clarity: 88, fillerWords: 3 },
    { session: 'Session 6', clarity: 86, fillerWords: 5 },
    { session: 'Session 7', clarity: 90, fillerWords: 2 },
  ];

  const topicWeaknessData = [
    { topic: 'Algorithms', score: 85, fullMark: 100 },
    { topic: 'System Design', score: 70, fullMark: 100 },
    { topic: 'Data Structures', score: 90, fullMark: 100 },
    { topic: 'Behavioral', score: 75, fullMark: 100 },
    { topic: 'Problem Solving', score: 80, fullMark: 100 },
    { topic: 'Communication', score: 88, fullMark: 100 },
  ];

  const activityData = [
    { week: 'W1', sessions: 2 },
    { week: 'W2', sessions: 3 },
    { week: 'W3', sessions: 1 },
    { week: 'W4', sessions: 4 },
    { week: 'W5', sessions: 2 },
    { week: 'W6', sessions: 3 },
    { week: 'W7', sessions: 5 },
    { week: 'W8', sessions: 3 },
  ];

  const rolePerformanceData = [
    { role: 'Frontend', confidence: 85, sessions: 12 },
    { role: 'Backend', confidence: 78, sessions: 8 },
    { role: 'Full Stack', confidence: 82, sessions: 15 },
    { role: 'Data Science', confidence: 70, sessions: 5 },
    { role: 'Mobile', confidence: 75, sessions: 6 },
    { role: 'DevOps', confidence: 80, sessions: 4 },
  ];

  const confidenceContentData = [
    { confidence: 85, contentQuality: 88, session: 'S1' },
    { confidence: 70, contentQuality: 75, session: 'S2' },
    { confidence: 90, contentQuality: 85, session: 'S3' },
    { confidence: 65, contentQuality: 70, session: 'S4' },
    { confidence: 88, contentQuality: 92, session: 'S5' },
    { confidence: 75, contentQuality: 80, session: 'S6' },
    { confidence: 92, contentQuality: 90, session: 'S7' },
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, icon: Icon, color }) => (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

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

      <div className="pl-25 p-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-slate-400">Track your interview performance and progress</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Current Confidence" 
            value="88%" 
            change={12} 
            icon={TrendingUp} 
            color="bg-gradient-to-br from-green-500 to-emerald-600"
          />
          <StatCard 
            title="Speaking Speed" 
            value="155 WPM" 
            change={8} 
            icon={Clock} 
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
          />
          <StatCard 
            title="Clarity Score" 
            value="90%" 
            change={15} 
            icon={Volume2} 
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          />
          <StatCard 
            title="Total Sessions" 
            value="47" 
            change={25} 
            icon={Target} 
            color="bg-gradient-to-br from-orange-500 to-red-600"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Confidence Over Time */}
          <div className="xl:col-span-2">
            <ChartCard 
              title="Confidence Over Time" 
              icon={TrendingUp} 
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={confidenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="session" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Mock Interview Readiness */}
          <ChartCard 
            title="Interview Readiness" 
            icon={Award} 
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          >
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#374151"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.87)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">87%</div>
                    <div className="text-sm text-slate-400">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* WPM Tracking */}
          <ChartCard 
            title="Words Per Minute" 
            icon={Clock} 
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
          >
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={wpmData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="session" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#EF4444" 
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Clarity Score */}
          <ChartCard 
            title="Clarity Score" 
            icon={Volume2} 
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={clarityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="session" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="clarity" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Topic Weakness Map */}
          <ChartCard 
            title="Topic Strength Map" 
            icon={Target} 
            color="bg-gradient-to-br from-yellow-500 to-orange-600"
          >
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={topicWeaknessData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="topic" stroke="#9CA3AF" />
                <PolarRadiusAxis stroke="#9CA3AF" />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Interview Activity */}
          <ChartCard 
            title="Weekly Activity" 
            icon={Calendar} 
            color="bg-gradient-to-br from-green-500 to-emerald-600"
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="sessions" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Role Performance */}
          <ChartCard 
            title="Role-Wise Performance" 
            icon={Users} 
            color="bg-gradient-to-br from-indigo-500 to-purple-600"
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={rolePerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, confidence }) => `${role}: ${confidence}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="confidence"
                >
                  {rolePerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Tip of the Day */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Tip of the Day</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                <p className="text-white font-medium mb-2">💡 Improve Your Clarity</p>
                <p className="text-slate-300 text-sm">
                  Based on your recent sessions, try to reduce filler words like "um" and "uh". 
                  Practice speaking more slowly and taking brief pauses to gather your thoughts.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-green-400">
                  <Brain className="w-4 h-4" />
                  <span>Confidence: +12%</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <Mic className="w-4 h-4" />
                  <span>Clarity: +15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Confidence vs Content Quality */}
          <ChartCard 
            title="Confidence vs Content Quality" 
            icon={Brain} 
            color="bg-gradient-to-br from-pink-500 to-rose-600"
          >
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={confidenceContentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="confidence" stroke="#9CA3AF" name="Confidence" />
                <YAxis dataKey="contentQuality" stroke="#9CA3AF" name="Content Quality" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Scatter dataKey="contentQuality" fill="#EC4899" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Resume Coverage Tracker */}
          <ChartCard 
            title="Resume Coverage Tracker" 
            icon={FileText} 
            color="bg-gradient-to-br from-cyan-500 to-blue-600"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Technical Skills</span>
                <span className="text-cyan-400">92%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Work Experience</span>
                <span className="text-green-400">85%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Projects</span>
                <span className="text-purple-400">78%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Education</span>
                <span className="text-yellow-400">95%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">Overall Coverage: 87.5%</span>
                </div>
                <p className="text-slate-300 text-sm mt-2">
                  Great coverage! Focus on discussing more project details in upcoming sessions.
                </p>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </main>
  );
}