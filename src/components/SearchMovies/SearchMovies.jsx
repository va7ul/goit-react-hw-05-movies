import { Link, useLocation } from 'react-router-dom';

export const SearchMovies = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
