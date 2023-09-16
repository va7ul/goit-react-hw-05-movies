import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'api';
import { AboutMovie } from 'components/AboutMovie/AboutMovie';

const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getMovieDetails() {
      try {
        const movie = await fetchMovieDetails(movieId);
        setMovieDetails(movie);
      } catch (error) {
        console.log(error);
      }
    }

    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <AboutMovie movieDetails={movieDetails} />
      <div>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MoviesDetailsPage;
