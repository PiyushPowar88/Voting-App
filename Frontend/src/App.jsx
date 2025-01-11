import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import CandidateList from './components/CandidateList';
import Vote from './components/Vote';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home'; // Add a Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Root path */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/candidates" element={<CandidateList />} />
        <Route path="/vote/:candidateID" element={<Vote />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
