import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Vote = () => {
  const { candidateID } = useParams(); // Extract the candidate ID from the URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleVote = async () => {
    if (!token) {
      console.error("User is not authenticated");
      alert("Please log in to vote.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9999/candidate/vote/${candidateID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      console.log("Vote submitted successfully:", response.data);
      alert("Vote recorded successfully!");
      navigate('/signup');
    } catch (error) {
      console.error(
        "Error during voting:",
        error.response?.data || error.message
      );
      if (error.response && error.response.status === 400) {
        alert("You have already voted.");
      } else if (error.response && error.response.status === 403) {
        alert("Admins are not allowed to vote.");
      } else {
        alert("An error occurred while submitting your vote.");
      }
    }
    navigate('/signup');

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleVote}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
      >
        Submit Vote
      </button>
    </div>
  );
};

export default Vote;
