import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api';
import { TrendingMovies } from 'components/TrendingMovies/TrendingMovies';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setError(false);

        const movies = await fetchTrendingMovies();

        if (movies.length) {
          setTrendingMovies(movies);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }

    getTrendingMovies();
  }, []);

  return error ? (
    <p style={{ color: 'red' }}>
      Sorry! There was an error! Please try refreshing the page!
    </p>
  ) : (
    <TrendingMovies movies={trendingMovies} />
  );
};

export default HomePage;
