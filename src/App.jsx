import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  // State to store the list of tours
  const [tours, setTours] = useState([]);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  // Function to fetch tours from the API
  const fetchTours = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('https://www.course-api.com/react-tours-project');
      if (!response.ok) {
        throw new Error('Failed to fetch tours'); // Throw an error if the response is not OK
      }
      const data = await response.json();
      setTours(data); // Update the tours state with fetched data
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Set the error message if fetching fails
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  // useEffect to fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Function to handle the removal of a tour
  const handleRemoveTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)); // Remove the tour with the given ID
  };

  // If loading is true, display a loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="error">
        <h2>Something went wrong!</h2>
        <p>{error}</p>
        <button className="btn-refresh" onClick={fetchTours}>
          Try Again
        </button>
      </div>
    );
  }

  // If no tours are left, display a "Refresh" button
  if (tours.length === 0) {
    return (
      <div className="no-tours">
        <h2>No Tours Left</h2>
        <button className="btn-refresh" onClick={fetchTours}>
          Refresh
        </button>
      </div>
    );
  }

  // Render the main content
  return (
    <>
      {/* Header */}
      <h1>Tour Gallery</h1>
      <div className="card">
        {/* Render the Gallery component with tours data */}
        <Gallery tours={tours} onRemoveTour={handleRemoveTour} />
      </div>
    </>
  );
}

export default App;
