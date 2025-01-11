import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await axios.get('http://localhost:9999/candidate/vote/count');
          setResults(response.data);
        } catch (error) {
          console.error(error);
          alert('Failed to fetch results');
        }
      };
      fetchResults();
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Election Results</h1>
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="text-xl">{result.party}</span>
              <span className="text-lg text-purple-600">{result.count} votes</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default AdminPanel;
  