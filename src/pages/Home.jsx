import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CreatePost from '../components/CreatePost';
import './Home.css';

const Home = () => {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [forumPosts, setForumPosts] = useState([
        {
            id: 1,
            author: {
                name: 'Alex Thompson',
                university: 'Stanford University',
                avatar: '/src/assets/images/forum1.png'
            },
            timeAgo: '2h ago',
            content: 'Looking for study partners for Advanced Calculus (MATH301). Planning to cover integration techniques this week. Anyone interested in joining?',
            tags: ['Mathematics', 'This Week'],
            comments: 12,
            saved: false
        },
        {
            id: 2,
            author: {
                name: 'Sarah Chen',
                university: 'Stanford University',
                avatar: '/src/assets/images/forum2.png'
            },
            timeAgo: '4h ago',
            content: 'Forming a study group for the upcoming Physics midterm. Focus on quantum mechanics and wave functions. Daily sessions from 6-8 PM. DM if interested!',
            tags: ['Physics', 'Daily'],
            comments: 8,
            saved: false
        },
        {
            id: 3,
            author: {
                name: 'James Wilson',
                university: 'Stanford University',
                avatar: '/src/assets/images/forum3.png'
            },
            timeAgo: '6h ago',
            content: 'Need help with Data Structures assignment. Working on implementing Red-Black trees. Anyone good at this topic? Would love to collaborate!',
            tags: ['Computer Science', 'Urgent'],
            comments: 15,
            saved: false
        }
    ]);

    const handleCreatePost = (newPost) => {
        setForumPosts([
            {
                id: forumPosts.length + 1,
                ...newPost
            },
            ...forumPosts
        ]);
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="content">
                <div className="forum-header">
                    <h1>Study Forum</h1>
                    <div className="forum-actions">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search discussions..." 
                                className="search-input"
                            />
                        </div>
                        <select className="subject-select">
                            <option>All Subjects</option>
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>Computer Science</option>
                        </select>
                        <button 
                            className="create-post-btn"
                            onClick={() => setIsCreatePostOpen(true)}
                        >
                            + Create Post
                        </button>
                    </div>
                </div>

                <div className="forum-posts">
                    {forumPosts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <div className="author-info">
                                    <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                                    <div>
                                        <h3>{post.author.name}</h3>
                                        <p>{post.author.university} • {post.timeAgo}</p>
                                    </div>
                                </div>
                                <button className="more-options">•••</button>
                            </div>
                            <div className="post-content">
                                <p>{post.content}</p>
                            </div>
                            <div className="post-tags">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className={`tag ${tag.toLowerCase().replace(' ', '-')}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="post-actions">
                                <button className="action-btn">
                                    <span>{post.comments} Comments</span>
                                </button>
                                <button className="action-btn">
                                    <span>Save</span>
                                </button>
                                <button className="action-btn">
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            <CreatePost 
                isOpen={isCreatePostOpen}
                onClose={() => setIsCreatePostOpen(false)}
                onSubmit={handleCreatePost}
            />
        </div>
    );
};

export default Home;
  
  