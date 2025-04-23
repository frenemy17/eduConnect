import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>© 2025 StudyMatch. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/support">Support</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 