"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {GoogleAuthButton,AuthHeader,AuthLayout} from "@/components/ui/auth/auth";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation"

export default function SignInPage () {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Sign In:', formData);
    setIsLoading(false);
    // Navigate to home/dashboard
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Google Sign In');
    setIsLoading(false);
    // Navigate to home/dashboard
  };

  const isFormValid = () => {
    return formData.email && formData.password;
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Welcome Back!" 
        subtitle="Sign in to continue your interview journey" 
      />

      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <GoogleAuthButton isLoading={isLoading} onClick={handleGoogleAuth} />

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <div className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl hover:bg-white/20 focus:bg-white/20 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl hover:bg-white/20 focus:bg-white/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
            className={`w-full h-12 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isFormValid() && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105"
                : "bg-slate-600 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Navigate to Sign Up */}
      <div className="text-center mt-6">
        <p className="text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={()=>router.push('/signup')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
// "use client"

// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { PlayIcon, Mic, Volume2, ChevronRight } from "lucide-react";
// import { useState, useEffect, useRef } from "react";

// export default function InterviewPage() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [activeInterviewer, setActiveInterviewer] = useState(0);
//   const [isListening, setIsListening] = useState(false);
//   const waveformRef = useRef<HTMLDivElement>(null);

//   const interviewers = [
//     { 
//       label: "HR Recruiter", 
//       role: "Behavioral Questions", 
//       image: "/avatars/hr.png",
//       accent: "American English",
//       color: "bg-pink-500"
//     },
//     { 
//       label: "Tech Lead", 
//       role: "Technical Deep Dive", 
//       image: "/avatars/tech.png",
//       accent: "British English",
//       color: "bg-indigo-500"
//     },
//     { 
//       label: "Engineering Manager", 
//       role: "System Design", 
//       image: "/avatars/manager.png",
//       accent: "Australian English",
//       color: "bg-purple-500"
//     },
//   ];

//   const questions = [
//     "Tell me about a time you faced a technical challenge and how you overcame it.",
//     "Explain how you would optimize a slow-rendering React component.",
//     "Walk me through your approach to designing a scalable web application.",
//     "How do you handle state management in complex applications?",
//     "Describe your experience with testing methodologies."
//   ];

//   useEffect(() => {
//     if (!isListening || !waveformRef.current) return;

//     const bars = waveformRef.current.children;
//     const interval = setInterval(() => {
//       Array.from(bars).forEach(bar => {
//         (bar as HTMLElement).style.height = `${Math.random() * 20 + 10}px`;
//       });
//     }, 200);

//     return () => clearInterval(interval);
//   }, [isListening]);

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-8 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
//       <div className="md:max-w-md space-y-8 w-full">
//         <div className="space-y-6">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
//             <p className="uppercase text-xs text-gray-400 tracking-wider">AI Mock Interview Session</p>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             <span className="bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent">
//               Realistic Interview Practice
//             </span>
//           </h1>

//           <p className="text-gray-300">
//             Experience human-like interviews with emotional voice simulation and adaptive questioning tailored to your role.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-400">Position</p>
//                 <p className="font-medium">Full Stack Developer</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Level</p>
//                 <p className="font-medium">Mid-Senior</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Round</p>
//                 <p className="font-medium">Technical</p>
//               </div>
//             </div>
//           </div>

//           <Button 
//             className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 py-6 rounded-xl text-md font-medium group transition-all"
//             onClick={() => setIsListening(true)}
//           >
//             Start Interview
//             <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//           </Button>
//         </div>

//         <div className="bg-[#1a1a1a]/50 p-4 rounded-xl border border-[#2a2a2a]/50">
//           <div className="flex items-center justify-between">
//             <h3 className="font-medium">Performance Insights</h3>
//             <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">Analyzing</span>
//           </div>
//           <div className="mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '65%' }}></div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full max-w-2xl space-y-8">
//         <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//           {interviewers.map((person, idx) => (
//             <Card 
//               key={idx}
//               className={`min-w-[180px] rounded-xl transition-all duration-300 ${activeInterviewer === idx ? 'border-pink-500/50' : 'border-[#333]'} hover:border-pink-500/30 cursor-pointer`}
//               onClick={() => setActiveInterviewer(idx)}
//             >
//               <CardHeader className="items-center pt-4 pb-2">
//                 <div className="relative">
//                   <Avatar className="w-16 h-16">
//                     <AvatarImage src={person.image} />
//                     <AvatarFallback className={person.color}>
//                       {person.label.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                   {activeInterviewer === idx && (
//                     <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#1a1a1a] animate-pulse"></div>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent className="text-center px-4 py-2">
//                 <h4 className="font-semibold text-sm">{person.label}</h4>
//                 <p className="text-xs text-gray-400 mt-1">{person.role}</p>
//                 <p className="text-xs text-blue-400 mt-1">{person.accent}</p>
//               </CardContent>
//               <CardFooter className="justify-center pb-4">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className={`rounded-full ${activeInterviewer === idx ? 'bg-pink-500/10 text-pink-400' : 'bg-gray-800'}`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setIsPlaying(!isPlaying);
//                   }}
//                 >
//                   {isPlaying && activeInterviewer === idx ? (
//                     <Volume2 className="w-4 h-4 fill-pink-400" />
//                   ) : (
//                     <PlayIcon className="w-4 h-4" />
//                   )}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         <div className="space-y-6">
//           <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#171717] p-6 rounded-2xl shadow-lg border border-[#2a2a2a]">
//             <div className="absolute -top-3 left-6 w-6 h-6 bg-[#1c1c1c] transform rotate-45 border-t border-l border-[#2a2a2a]"></div>
//             <p className="text-gray-200">
//               {questions[activeInterviewer % questions.length]}
//             </p>
//             <div className="absolute -bottom-4 right-6 w-8 h-8 bg-[#2b2b2b] flex items-center justify-center rounded-full shadow-lg border border-[#3a3a3a] hover:bg-[#333] transition-colors cursor-pointer">
//               {isPlaying ? (
//                 <Volume2 className="w-4 h-4 text-pink-400" />
//               ) : (
//                 <PlayIcon className="w-4 h-4 text-pink-400" />
//               )}
//             </div>
//           </div>

//           <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-medium">Your Response</h3>
//               <div className="flex items-center gap-2">
//                 <span className={`text-xs px-2 py-1 rounded-full ${isListening ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
//                   {isListening ? 'Listening...' : 'Ready'}
//                 </span>
//               </div>
//             </div>

//             <div 
//               ref={waveformRef}
//               className="flex gap-1.5 items-end h-12 mb-6 px-4 py-2 bg-[#222] rounded-lg"
//             >
//               {[...Array(24)].map((_, i) => (
//                 <div 
//                   key={i}
//                   className="flex-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-sm opacity-70 transition-all duration-200"
//                   style={{ height: `${Math.random() * 10 + 5}px` }}
//                 ></div>
//               ))}
//             </div>

//             <div className="flex justify-center gap-4">
//               <Button
//                 variant={isListening ? "destructive" : "default"}
//                 className={`rounded-full h-14 w-14 p-0 ${isListening ? 'animate-pulse' : ''}`}
//                 onClick={() => setIsListening(!isListening)}
//               >
//                 <Mic className="h-5 w-5" />
//               </Button>
//               <Button variant="outline" className="rounded-full h-14 w-14 p-0" disabled={!isListening}>
//                 <PlayIcon className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }