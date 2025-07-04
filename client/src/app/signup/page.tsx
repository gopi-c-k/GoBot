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
  User, 
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation"

export default function SignUpPage () {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    console.log('Sign Up:', formData);
    setIsLoading(false);
    // Navigate to home/dashboard
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Google Sign Up');
    setIsLoading(false);
    // Navigate to home/dashboard
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.password && 
           formData.confirmPassword && formData.password === formData.confirmPassword;
  };

  return (
    <AuthLayout>
      <AuthHeader 
        title="Create Account" 
        subtitle="Join thousands of successful candidates" 
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
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl hover:bg-white/20 focus:bg-white/20 transition-colors"
            />
          </div>

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

          {/* Confirm Password Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl hover:bg-white/20 focus:bg-white/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Mismatch Warning */}
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">!</span>
              Passwords don't match
            </p>
          )}

          {/* Sign Up Button */}
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
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-xs text-slate-400 mt-4 text-center">
          By creating an account, you agree to our{" "}
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </button>
        </p>
      </div>

      {/* Navigate to Sign In */}
      <div className="text-center mt-6">
        <p className="text-slate-400">
          Already have an account?{" "}
          <button
            onClick={()=>router.push('/signin')}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};