import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, MessageSquare, Video, Home, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-indigo-100 text-indigo-700 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={() => setIsOpen(false)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudyMatch</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              <NavLink to="/" icon={<Home size={18} />} label="Dashboard" />
              <NavLink to="/find-partners" icon={<User size={18} />} label="Find Partners" />
              <NavLink to="/study-room" icon={<Video size={18} />} label="Study Room" />
              <NavLink to="/messages" icon={<MessageSquare size={18} />} label="Messages" />
            </nav>
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={currentUser.photoURL || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <span className="hidden md:block font-medium text-gray-700">
                    {currentUser.displayName?.split(' ')[0] || 'User'}
                  </span>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{currentUser.displayName}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </Link>
            )}
            
            {/* Mobile menu button */}
            <div className="flex md:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <NavLink to="/" icon={<Home size={18} />} label="Dashboard" />
            <NavLink to="/find-partners" icon={<User size={18} />} label="Find Partners" />
            <NavLink to="/study-room" icon={<Video size={18} />} label="Study Room" />
            <NavLink to="/messages" icon={<MessageSquare size={18} />} label="Messages" />
          </div>
        </div>
      )}
    </header>
  );
}