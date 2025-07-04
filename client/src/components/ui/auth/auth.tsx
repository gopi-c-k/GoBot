"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight,
  Chrome,
  ArrowLeft
} from "lucide-react";

// Base Auth Layout Component
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
};

// Header Component
const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          GoBot
        </h1>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400">{subtitle}</p>
    </div>
  );
};

// Google Auth Button Component
const GoogleAuthButton = ({ isLoading, onClick }) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl mb-6 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          <Chrome className="w-5 h-5" />
          Continue with Google
        </>
      )}
    </Button>
  );
};

// Features Preview Component
const FeaturesPreview = () => {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="text-xs text-slate-300">AI Interview</p>
      </div>
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="text-xs text-slate-300">Real-time Feedback</p>
      </div>
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="text-xs text-slate-300">Progress Tracking</p>
      </div>
    </div>
  );
};

export {FeaturesPreview,GoogleAuthButton,AuthHeader,AuthLayout};

// SIGN IN PAGE COMPONENT


// SIGN UP PAGE COMPONENT


// // DEMO ROUTING COMPONENT
// const AuthDemo = () => {
//   const [currentPage, setCurrentPage] = useState("signin"); // "signin" | "signup" | "home"

//   const navigateToSignIn = () => setCurrentPage("signin");
//   const navigateToSignUp = () => setCurrentPage("signup");
//   const navigateToHome = () => setCurrentPage("home");

//   if (currentPage === "home") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Sparkles className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Welcome to GoBot!</h1>
//           <p className="text-slate-300 mb-8">Authentication successful. You're now logged in.</p>
//           <button
//             onClick={navigateToSignIn}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {currentPage === "signin" && (
//         <SignInPage 
//           onNavigateToSignUp={navigateToSignUp}
//           onNavigateToHome={navigateToHome}
//         />
//       )}
//       {currentPage === "signup" && (
//         <SignUpPage 
//           onNavigateToSignIn={navigateToSignIn}
//           onNavigateToHome={navigateToHome}
//         />
//       )}
//     </>
//   );
// };

// export default AuthDemo;