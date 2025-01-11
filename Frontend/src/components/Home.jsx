// src/components/Home.jsx
const Home = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 text-gray-800">
        <h1 className="text-4xl font-semibold text-purple-700 mb-4">Welcome to the Voting App</h1>
        <p className="text-xl">
          Please <a href="/login" className="text-purple-600 hover:text-purple-800">log in</a> or <a href="/signup" className="text-purple-600 hover:text-purple-800">sign up</a> to continue.
        </p>
      </div>
    );
  };
  
  export default Home;
  
