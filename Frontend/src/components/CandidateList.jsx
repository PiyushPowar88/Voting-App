import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:9999/candidate/listcandidates');
      // console.log("response",response)
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      alert('Failed to fetch candidates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleVote = (candidateID) => {
    navigate(`/vote/${candidateID}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Candidates</h1>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-purple-600 rounded-full"></div>
            <p className="text-lg text-gray-700 mt-2">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No candidates available.</p>
        ) : (
          <ul className="space-y-4">
            {candidates.map((candidate) => (
              <li
                key={candidate._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <p className="text-sm text-gray-600">{candidate.party}</p>
                </div>
                <button
                  onClick={() => handleVote(candidate._id)}
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
