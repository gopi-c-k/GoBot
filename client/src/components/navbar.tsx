"use client"

import { useState } from "react";
import { 
  Video, 
  BarChart3, 
  History, 
  LogOut, 
  Sparkles 
} from "lucide-react";

const VerticalNavbar = ({ activeItem = "interview", onItemClick, className = "" }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      id: "interview",
      icon: Video,
      label: "Interview Room",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "dashboard",
      icon: BarChart3,
      label: "Dashboard",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "history",
      icon: History,
      label: "Session History",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const handleItemClick = (itemId) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className={`fixed left-4 top-4 bottom-4 z-50 ${className}`}>
      <div className="h-full w-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center py-6">
        {/* App Icon */}
        <div className="relative group mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap ml-2">
            GoBot
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} shadow-lg`
                      : "bg-white/10 hover:bg-white/20 shadow-md"
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`} 
                  />
                </button>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                )}

                {/* Tooltip */}
                <div className={`absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium transition-opacity duration-200 pointer-events-none whitespace-nowrap ml-2 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="relative group">
          <button
            onClick={() => handleItemClick("logout")}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 hover:scale-110 shadow-md"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
          </button>

          {/* Tooltip */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap ml-2">
            Logout
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VerticalNavbar }
