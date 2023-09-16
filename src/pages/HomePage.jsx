import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api';
import { TrendingMovies } from 'components/TrendingMovies/TrendingMovies';
import { Loader } from 'components/Loader';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setLoading(true);
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return loading ? <Loader /> : <TrendingMovies movies={trendingMovies} />;
};

export default HomePage;
