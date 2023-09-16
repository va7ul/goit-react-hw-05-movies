import { Link, Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'api';
import { AboutMovie } from 'components/AboutMovie/AboutMovie';
import { Loader } from 'components/Loader';

const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getMovieDetails() {
      try {
        setError(false);

        const movie = await fetchMovieDetails(movieId);

        if (movie.id) {
          setMovieDetails(movie);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }

    getMovieDetails();
  }, [movieId]);

  return error ? (
    <p style={{ color: 'red' }}>
      Sorry! There was an error! Please try refreshing the page!
    </p>
  ) : (
    <div>
      <AboutMovie movieDetails={movieDetails} />
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MoviesDetailsPage;
