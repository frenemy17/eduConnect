import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home',{state: {email: email, password: password}});
    } catch (err) {
      setError(err.message);
    }

  };
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to StudyMatch</h2>
      <p className={styles.subtitle}>Connect with study partners from your university</p>

      <button className={styles.googleButton} onClick={handleGoogleSignup}>
  <img 
    src="https://www.google.com/favicon.ico" 
    alt="Google" 
    style={{ width: '20px', height: '20px' }}
  />
  Continue with Google
</button>


      <div className={styles.divider}>
        <span className={styles.dividerText}>or</span>
        <div className={styles.dividerLine}></div>
      </div>

      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>
          Create Account
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.loginText}>
        Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
