import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { fetchSearchMovies } from 'api';
import { SearchMovies } from 'components/SearchMovies/SearchMovies';
import { Loader } from 'components/Loader';
import { SearchForm } from 'components/SearchForm/SearchForm';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {
      return setSearchMovies([]);
    }

    async function getSearchMovies() {
      try {
        setError(false);
        setLoading(true);
        const movies = await fetchSearchMovies(query);

        if (!movies.length) {
          toast.error('Sorry, nothing was found!', {
            duration: 2000,
          });
        }

        setSearchMovies(movies);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    getSearchMovies();
  }, [query]);

  const getSearchQuery = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value;

    if (searchQuery.trim() === '') {
      toast.error('Please enter key word for search!', {
        duration: 2000,
      });
      return;
    }

    setSearchParams({ query: searchQuery });
    event.target.reset();
  };

  return (
    <div>
      <SearchForm getSearchQuery={getSearchQuery} />
      {error && (
        <p style={{ color: 'red' }}>
          Sorry! There was an error! Please try refreshing the page!
        </p>
      )}
      {loading ? <Loader /> : <SearchMovies movies={searchMovies} />}
      <Toaster />
    </div>
  );
};

export default MoviesPage;
