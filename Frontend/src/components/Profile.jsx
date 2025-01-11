import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9999/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  return profile ? (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6">Welcome, {profile.name}</h1>
        <div className="space-y-4">
          <p className="text-xl text-gray-700">
            <strong className="font-semibold">Email:</strong> {profile.email}
          </p>
          <p className="text-xl text-gray-700">
            <strong className="font-semibold">Mobile:</strong> {profile.mobile}
          </p>
          <p className="text-xl text-gray-700">
            <strong className="font-semibold">Address:</strong> {profile.address}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4">
      <div className="text-xl text-gray-700">Loading...</div>
    </div>
  );
};

export default Profile;
