import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ isOpen, onClose, onSubmit }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [urgency, setUrgency] = useState('normal');

    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postContent.trim() || !selectedSubject) return;

        const newPost = {
            content: postContent,
            tags: [selectedSubject, urgency === 'urgent' ? 'Urgent' : 'This Week'],
            author: {
                name: 'Current User', // This would come from auth context in a real app
                university: 'Stanford University',
                avatar: '/src/assets/images/forum1.png'
            },
            timeAgo: 'Just now',
            comments: 0,
            saved: false
        };

        onSubmit(newPost);
        setPostContent('');
        setSelectedSubject('');
        setUrgency('normal');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Post</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Subject</label>
                        <select 
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            required
                        >
                            <option value="">Select a subject</option>
                            {subjects.map(subject => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Post Content</label>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="What would you like to discuss or ask?"
                            required
                            rows={5}
                        />
                    </div>
                    <div className="form-group">
                        <label>Urgency</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="normal"
                                    checked={urgency === 'normal'}
                                    onChange={(e) => setUrgency(e.target.value)}
                                />
                                This Week
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="urgent"
                                    checked={urgency === 'urgent'}
                                    onChange={(e) => setUrgency(e.target.value)}
                                />
                                Urgent
                            </label>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost; 