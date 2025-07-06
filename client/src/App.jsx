import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅
import Navbar from '../components/Navbar';

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{
        duration: 3000, style: {
          marginTop: '70px', // ✅ Space from top
          background: '#333',
          color: '#fff',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      }} />
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
