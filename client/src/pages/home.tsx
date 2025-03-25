import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); // For navigation control

  const handleStartJourney = () => {
    navigate('/main'); // Redirects to MainPage (the map screen)
  };

  const handleViewStats = () => {
    navigate('/stats'); // Redirect to stats page (when implemented)
  };

  return (
    <section className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to SnowTracs</h1>
      <p className="text-lg mb-8">Track your snowboarding adventures in style.</p>

      {/* Navigation buttons */}
      <button 
        onClick={handleStartJourney} 
        className="btn btn-primary w-full py-3 mb-4"
      >
        Start Your Journey
      </button>
      <button 
        onClick={handleViewStats} 
        className="btn btn-secondary w-full py-3"
      >
        View My Stats
      </button>

      <footer className="mt-8 text-center">
        <p>&copy; 2025 SnowTracs. All rights reserved.</p>
      </footer>
    </section>
  );
}
