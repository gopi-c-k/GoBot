"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerticalNavbar } from "@/components/navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Upload, FileText, Users, Target, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Nav Bar
  const [activeNavItem, setActiveNavItem] = useState("interview");

  const handleNavClick = (itemId) => {
    if (itemId === "logout") {
      // Handle logout logic
      console.log("Logging out...");
      return;
    }
    setActiveNavItem(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    }
  };

  const isFormValid = fileName && role && round;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
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
      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GoBot
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-2">AI-Powered Interview Assistant</p>
          <p className="text-slate-400">Upload your resume and experience a realistic interview simulation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Info Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Analysis</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Our AI analyzes your resume and tailors questions based on your experience and the role you're applying for.
            </p>
          </div>

          {/* Center Main Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="space-y-6">
              {/* File Upload Section */}
              <div>
                <label className="block mb-3 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Upload Resume (PDF)
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${isDragOver
                    ? "border-blue-400 bg-blue-500/10"
                    : fileName
                      ? "border-green-400 bg-green-500/10"
                      : "border-slate-600 hover:border-slate-500"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    {fileName ? (
                      <div className="flex items-center justify-center gap-2 text-green-400">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-medium">{fileName}</span>
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Drop your PDF here or click to browse</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block mb-3 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select Role
                </label>
                <Select onValueChange={(val) => setRole(val)}>
                  <SelectTrigger className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors rounded-xl h-12">
                    <SelectValue placeholder="Choose your target role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-slate-700 rounded-xl">
                    <SelectItem value="frontend" className="hover:bg-slate-700 rounded-lg">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="backend" className="hover:bg-slate-700 rounded-lg">
                      Backend Developer
                    </SelectItem>
                    <SelectItem value="fullstack" className="hover:bg-slate-700 rounded-lg">
                      Full Stack Developer
                    </SelectItem>
                    <SelectItem value="data" className="hover:bg-slate-700 rounded-lg">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="mobile" className="hover:bg-slate-700 rounded-lg">
                      Mobile Developer
                    </SelectItem>
                    <SelectItem value="devops" className="hover:bg-slate-700 rounded-lg">
                      DevOps Engineer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Round Selection */}
              <div>
                <label className="block mb-3 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Select Interview Round
                </label>
                <Select onValueChange={(val) => setRound(val)}>
                  <SelectTrigger className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors rounded-xl h-12">
                    <SelectValue placeholder="Choose interview type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-slate-700 rounded-xl">
                    <SelectItem value="technical" className="hover:bg-slate-700 rounded-lg">
                      Technical Round
                    </SelectItem>
                    <SelectItem value="hr" className="hover:bg-slate-700 rounded-lg">
                      HR Round
                    </SelectItem>
                    <SelectItem value="managerial" className="hover:bg-slate-700 rounded-lg">
                      Managerial Round
                    </SelectItem>
                    <SelectItem value="behavioral" className="hover:bg-slate-700 rounded-lg">
                      Behavioral Round
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Button */}
              <Button
                disabled={!isFormValid}
                className={`w-full h-12 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isFormValid
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-slate-600 cursor-not-allowed"
                  }`}
              >
                Start Interview
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Info Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Pro Tips</h3>
            </div>
            <ul className="text-slate-300 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Upload a well-formatted PDF resume for best results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Choose the role that matches your target position</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Practice in a quiet environment with good lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Get personalized feedback after each session</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}