import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, BookOpen, BookMarked, BarChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const firstName = currentUser?.displayName?.split(' ')[0] || 'Student';

  const stats = [
    { name: 'Study Sessions', value: '12', icon: <Clock size={20} className="text-blue-500" /> },
    { name: 'Study Partners', value: '8', icon: <Users size={20} className="text-purple-500" /> },
    { name: 'Subjects', value: '4', icon: <BookOpen size={20} className="text-emerald-500" /> },
    { name: 'Hours Studied', value: '24', icon: <BarChart size={20} className="text-amber-500" /> },
  ];

  const upcomingSessions = [
    {
      id: 1,
      subject: 'Calculus II',
      with: 'Sarah Chen',
      time: 'Today, 4:00 PM',
      duration: '1 hour',
    },
    {
      id: 2,
      subject: 'Organic Chemistry',
      with: 'James Wilson',
      time: 'Tomorrow, 10:00 AM',
      duration: '2 hours',
    },
    {
      id: 3,
      subject: 'Computer Science',
      with: 'Miguel Rodriguez',
      time: 'Wed, 3:30 PM',
      duration: '1.5 hours',
    },
  ];

  const recentPartners = [
    {
      id: 1,
      name: 'Emma Thompson',
      university: 'MIT',
      subject: 'Physics',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      name: 'David Kim',
      university: 'Stanford',
      subject: 'Biology',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      name: 'Priya Patel',
      university: 'UC Berkeley',
      subject: 'Economics',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
        <p className="mt-2 text-lg text-gray-600">Here's an overview of your study activities</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-50 rounded-md p-3">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Study Sessions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">Upcoming Study Sessions</h2>
              </div>
              <Link
                to="/study-room"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-200">
              {upcomingSessions.map((session) => (
                <li key={session.id}>
                  <div className="px-6 py-4 flex items-center hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{session.subject}</p>
                      <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-500 mr-2">with {session.with}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {session.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{session.time}</p>
                    </div>
                    <div>
                      <Link
                        to="/study-room"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {upcomingSessions.length === 0 && (
              <div className="px-6 py-10 text-center">
                <p className="text-gray-500">No upcoming sessions scheduled</p>
                <Link
                  to="/find-partners"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Find Study Partners
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Study Partners */}
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <BookMarked className="h-5 w-5 text-indigo-600" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">Recent Partners</h2>
              </div>
              <Link
                to="/find-partners"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Find more
              </Link>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentPartners.map((partner) => (
                <li key={partner.id}>
                  <div className="px-6 py-4 flex items-center hover:bg-gray-50">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={partner.image}
                      alt={partner.name}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                      <div className="mt-1 flex items-center">
                        <p className="text-xs text-gray-500">{partner.university}</p>
                        <span className="mx-1 text-gray-500">•</span>
                        <p className="text-xs text-gray-500">{partner.subject}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/find-partners"
                className="text-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Find Partners
              </Link>
              <Link
                to="/study-room"
                className="text-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Join Study Room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}