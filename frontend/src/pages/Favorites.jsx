import { useMovieContext } from "../../context/MovieContext";
import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>Add movies to your favorites to see them here!</h2>
    </div>
  );
}

export default Favorites;
