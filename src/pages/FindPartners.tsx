import React, { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';

// Define the types for our component
interface StudyPartner {
  id: number;
  name: string;
  image: string;
  university: string;
  subjects: string[];
  availability: 'online' | 'away' | 'offline';
  studyHours: string;
  rating: number;
  location: string;
}

export default function FindPartners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 6;

  // Mock data for study partners
  const studyPartners: StudyPartner[] = [
    {
      id: 1,
      name: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'MIT',
      subjects: ['Physics', 'Calculus', 'Quantum Mechanics'],
      availability: 'online',
      studyHours: '20 hrs/week',
      rating: 4.8,
      location: 'Cambridge, MA',
    },
    {
      id: 2,
      name: 'David Kim',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Stanford',
      subjects: ['Biology', 'Chemistry', 'Organic Chemistry'],
      availability: 'online',
      studyHours: '15 hrs/week',
      rating: 4.5,
      location: 'Palo Alto, CA',
    },
    {
      id: 3,
      name: 'Priya Patel',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'UC Berkeley',
      subjects: ['Economics', 'Statistics', 'Business'],
      availability: 'away',
      studyHours: '10 hrs/week',
      rating: 4.9,
      location: 'Berkeley, CA',
    },
    {
      id: 4,
      name: 'Marcus Johnson',
      image: 'https://images.pexels.com/photos/2876486/pexels-photo-2876486.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Harvard',
      subjects: ['Law', 'Political Science', 'History'],
      availability: 'offline',
      studyHours: '25 hrs/week',
      rating: 4.7,
      location: 'Cambridge, MA',
    },
    {
      id: 5,
      name: 'Sophie Chen',
      image: 'https://images.pexels.com/photos/3783958/pexels-photo-3783958.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'UCLA',
      subjects: ['Computer Science', 'Data Structures', 'Algorithms'],
      availability: 'online',
      studyHours: '30 hrs/week',
      rating: 4.6,
      location: 'Los Angeles, CA',
    },
    {
      id: 6,
      name: 'James Wilson',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Columbia',
      subjects: ['Literature', 'Creative Writing', 'Philosophy'],
      availability: 'away',
      studyHours: '12 hrs/week',
      rating: 4.4,
      location: 'New York, NY',
    },
    {
      id: 7,
      name: 'Olivia Martinez',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Yale',
      subjects: ['Psychology', 'Neuroscience', 'Biology'],
      availability: 'online',
      studyHours: '18 hrs/week',
      rating: 4.9,
      location: 'New Haven, CT',
    },
    {
      id: 8,
      name: 'Raj Kapoor',
      image: 'https://images.pexels.com/photos/6179390/pexels-photo-6179390.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Princeton',
      subjects: ['Mathematics', 'Physics', 'Engineering'],
      availability: 'online',
      studyHours: '22 hrs/week',
      rating: 4.7,
      location: 'Princeton, NJ',
    },
    {
      id: 9,
      name: 'Zoe Williams',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'Duke',
      subjects: ['Medicine', 'Anatomy', 'Physiology'],
      availability: 'away',
      studyHours: '28 hrs/week',
      rating: 4.8,
      location: 'Durham, NC',
    },
    {
      id: 10,
      name: 'Liam Johnson',
      image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150',
      university: 'University of Chicago',
      subjects: ['Economics', 'Finance', 'Accounting'],
      availability: 'offline',
      studyHours: '15 hrs/week',
      rating: 4.6,
      location: 'Chicago, IL',
    },
  ];

  // Filter partners based on search and filters
  const filteredPartners = studyPartners.filter((partner) => {
    const matchesSearch =
      searchTerm === '' ||
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      partner.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      filterSubject === '' ||
      partner.subjects.some((subject) => subject.toLowerCase().includes(filterSubject.toLowerCase()));

    const matchesUniversity =
      filterUniversity === '' ||
      partner.university.toLowerCase().includes(filterUniversity.toLowerCase());

    const matchesAvailability =
      filterAvailability === '' || partner.availability === filterAvailability;

    return matchesSearch && matchesSubject && matchesUniversity && matchesAvailability;
  });

  // Pagination logic
  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

  // Helper function to render availability status
  const renderAvailabilityStatus = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
            Online
          </span>
        );
      case 'away':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
            Away
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="h-2 w-2 rounded-full bg-gray-500 mr-1"></span>
            Offline
          </span>
        );
    }
  };

  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Study Partners</h1>
        <p className="mt-2 text-lg text-gray-600">
          Connect with students who share your academic interests
        </p>
      </header>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by name, subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Subject Filter */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 sr-only">
              Subject
            </label>
            <select
              id="subject"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="mathematics">Mathematics</option>
              <option value="computer science">Computer Science</option>
              <option value="economics">Economics</option>
              <option value="literature">Literature</option>
              <option value="psychology">Psychology</option>
            </select>
          </div>

          {/* University Filter */}
          <div>
            <label
              htmlFor="university"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              University
            </label>
            <select
              id="university"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterUniversity}
              onChange={(e) => setFilterUniversity(e.target.value)}
            >
              <option value="">All Universities</option>
              <option value="mit">MIT</option>
              <option value="stanford">Stanford</option>
              <option value="harvard">Harvard</option>
              <option value="berkeley">UC Berkeley</option>
              <option value="yale">Yale</option>
              <option value="princeton">Princeton</option>
              <option value="columbia">Columbia</option>
              <option value="ucla">UCLA</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Availability
            </label>
            <select
              id="availability"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
            >
              <option value="">Any Availability</option>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Filter className="h-4 w-4 mr-1" />
          <span>
            Showing {filteredPartners.length} {filteredPartners.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {currentPartners.length > 0 ? (
          currentPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100"
                    src={partner.image}
                    alt={partner.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      {partner.name}
                      {renderAvailabilityStatus(partner.availability)}
                    </h3>
                    <p className="text-sm text-gray-600">{partner.university}</p>
                    <div className="mt-1 flex items-center">
                      {renderStarRating(partner.rating)}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{partner.studyHours}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{partner.location}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900">Subjects:</h4>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {partner.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                    View Profile
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No study partners found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterSubject('');
                setFilterUniversity('');
                setFilterAvailability('');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'text-gray-300 bg-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-300 bg-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstPartner + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPartner, filteredPartners.length)}
                </span>{' '}
                of <span className="font-medium">{filteredPartners.length}</span> results
              </p>
            </div>
            <div>
              <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 bg-white'
                      : 'text-gray-500 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 bg-white'
                      : 'text-gray-500 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}