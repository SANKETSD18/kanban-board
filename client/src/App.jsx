import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Card from '../components/Card';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅
import Navbar from '../components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ Public Route */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<LoginForm />} />
        {/* ✅ Protected Route */}
        <Route
          path="/addtodo"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
