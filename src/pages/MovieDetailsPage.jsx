import { NavLink, Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovieDetails } from 'api';
import { AboutMovie } from 'components/AboutMovie/AboutMovie';
import { Loader } from 'components/Loader';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

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
      <hr />
      <h4 style={{ margin: '10px 0' }}>Additional information</h4>
      <ul style={{ display: 'flex', gap: '16px', padding: '0 0 8px 0' }}>
        <li>
          <StyledLink to="cast">Cast</StyledLink>
        </li>
        <li>
          <StyledLink to="reviews">Reviews</StyledLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MoviesDetailsPage;
