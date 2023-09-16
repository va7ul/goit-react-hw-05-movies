import { Link, Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'api';
import { AboutMovie } from 'components/AboutMovie/AboutMovie';
import { Loader } from 'components/Loader';

const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getMovieDetails() {
      try {
        setLoading(true);
        const movie = await fetchMovieDetails(movieId);
        setMovieDetails(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getMovieDetails();
  }, [movieId]);

  return loading ? (
    <Loader />
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
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MoviesDetailsPage;
