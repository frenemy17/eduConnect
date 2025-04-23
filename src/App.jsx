import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx'; // Create a simple one if missing
import FindPartners from './pages/FindPartners.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-partners"
          element={
            <ProtectedRoute>
              <FindPartners />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
