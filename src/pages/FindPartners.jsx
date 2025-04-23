import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './FindPartners.css';

const FindPartners = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [selectedUniversity, setSelectedUniversity] = useState('All Universities');
    const [activeFilters, setActiveFilters] = useState([]);
    const [viewMode, setViewMode] = useState('grid');

    const stats = [
        { label: 'Online Now', count: 24, icon: '👥' },
        { label: 'Available Today', count: 156, icon: '🕒' },
        { label: 'Study Groups', count: 12, icon: '📚' },
        { label: 'Universities', count: 8, icon: '🎓' }
    ];

    const students = [
        {
            id: 1,
            name: 'Michael Chen',
            university: 'Stanford University',
            subjects: ['Mathematics', 'Physics'],
            status: 'Online',
            description: 'Interested in group study for Calculus and Linear Algebra. Available on weekdays after 4 PM.',
            studyHours: '2-3 hours/day',
            rating: 4.8,
            reviews: 24,
            image: '/path/to/michael.jpg'
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            university: 'Stanford University',
            subjects: ['Physics', 'Chemistry'],
            status: 'Online',
            description: 'Looking for study partners for Quantum Mechanics and Advanced Physics courses.',
            studyHours: '3-4 hours/day',
            rating: 4.9,
            reviews: 31,
            image: '/path/to/sarah.jpg'
        },
        {
            id: 3,
            name: 'Alex Thompson',
            university: 'Stanford University',
            subjects: ['Computer Science'],
            status: 'Away',
            description: 'Focusing on Data Structures, Algorithms, and System Design patterns.',
            studyHours: '4-5 hours/day',
            rating: 4.7,
            reviews: 18,
            image: '/path/to/alex.jpg'
        }
    ];

    const handleFilterAdd = (type, value) => {
        if (!activeFilters.some(filter => filter.value === value)) {
            setActiveFilters([...activeFilters, { type, value }]);
        }
    };

    const handleFilterRemove = (value) => {
        setActiveFilters(activeFilters.filter(filter => filter.value !== value));
    };

    const handleConnect = (studentId) => {
        
        console.log('Connecting with student:', studentId);
    };

    return (
        <div className="find-partners-page">
            <Navbar />
            <div className="content-container">
                <div className="header-section">
                    <h1>Find Study Partners</h1>
                    <div className="view-toggle">
                        <span>View:</span>
                        <button 
                            className={`view-btn ${viewMode === 'info' ? 'active' : ''}`}
                            onClick={() => setViewMode('info')}
                        >
                            ℹ️
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by name, subject or university"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <select 
                            value={selectedSubject}
                            onChange={(e) => {
                                setSelectedSubject(e.target.value);
                                if (e.target.value !== 'All Subjects') {
                                    handleFilterAdd('subject', e.target.value);
                                }
                            }}
                        >
                            <option>All Subjects</option>
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>Computer Science</option>
                        </select>
                        <select 
                            value={selectedUniversity}
                            onChange={(e) => {
                                setSelectedUniversity(e.target.value);
                                if (e.target.value !== 'All Universities') {
                                    handleFilterAdd('university', e.target.value);
                                }
                            }}
                        >
                            <option>All Universities</option>
                            <option>Stanford University</option>
                            <option>MIT</option>
                            <option>Harvard University</option>
                        </select>
                    </div>
                </div>

                <div className="active-filters">
                    {activeFilters.map((filter, index) => (
                        <div key={index} className="filter-tag">
                            {filter.value}
                            <button onClick={() => handleFilterRemove(filter.value)}>×</button>
                        </div>
                    ))}
                    {activeFilters.length > 0 && (
                        <button className="clear-filters" onClick={() => setActiveFilters([])}>
                            Clear all filters
                        </button>
                    )}
                </div>

                <div className="stats-section">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <span className="stat-icon">{stat.icon}</span>
                            <span className="stat-count">{stat.count}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className={`students-grid ${viewMode}`}>
                    {students.map(student => 
                        (student.subjects.includes(selectedSubject) && student.university === selectedUniversity) || (selectedSubject === 'All Subjects' && selectedUniversity === 'All Universities') && (

                        <div key={student.id} className="student-card">
                            <div className="student-header">
                                <img src={student.image} alt={student.name} className="student-image" />
                                <div className="student-info">
                                    <h3>{student.name}</h3>
                                    <p className="university">{student.university}</p>
                                    <div className="status-badge" data-status={student.status.toLowerCase()}>
                                        {student.status}
                                    </div>
                                </div>
                            </div>
                            <div className="subjects">
                                {student.subjects.map((subject, index) => (
                                    <span key={index} className="subject-tag">{subject}</span>
                                ))}
                            </div>
                            <p className="description">{student.description}</p>
                            <div className="study-info">
                                <span>🕒 Usually studies {student.studyHours}</span>
                            </div>
                            <div className="rating">
                                <span className="stars">⭐ {student.rating}</span>
                                <span className="reviews">({student.reviews} reviews)</span>
                            </div>
                            <div className="action-buttons">
                                <button className="connect-btn" onClick={() => handleConnect(student.id)}>
                                    Connect
                                </button>
                                <button className="message-btn">💬</button>
                                <button className="bookmark-btn">🔖</button>
                            </div>
                        </div>)
                    )}
                </div>

                <div className="pagination">
                    <button className="prev-btn">← Previous</button>
                    <div className="page-numbers">
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <span>...</span>
                        <button>12</button>
                    </div>
                    <button className="next-btn">Next →</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FindPartners;
  