import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");

  // fetch API key on mount
  useEffect(() => {
    const fetchApiKeyAndMovies = async () => {
      try {
        const keyResponse = await fetch("http://localhost:5000/api/get-movie-key");
        const keyData = await keyResponse.json();
        setApiKey(keyData.tmdb_key);

        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${keyData.tmdb_key}`
        );
        const moviesData = await moviesResponse.json();
        setMovies(moviesData.results);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeyAndMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies ..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="movies-grid">
          {movies
            .filter((movie) =>
              movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            .map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
