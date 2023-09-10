import { useState, useEffect } from 'react';
import { TrendingMovies } from 'components/TrendingMovies/TrendingMovies';
import { fetchTrendingMovies } from '../api';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }

    getTrendingMovies();
  }, []);

  return <TrendingMovies movies={trendingMovies} />;
};

export default HomePage;
