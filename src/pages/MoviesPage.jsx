import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSearchMovies } from 'api';
import { SearchMovies } from 'components/SearchMovies/SearchMovies';

const MoviesPage = () => {
  const [searchParaps, setSearchParaps] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);

  const query = searchParaps.get('query');

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getSearchMovies() {
      try {
        const movies = await fetchSearchMovies(query);
        setSearchMovies(movies);
      } catch (error) {
        console.log(error);
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

    setSearchParaps({ query: searchQuery });
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={getSearchQuery}>
        <input type="text" name="query" required />
        <button type="submit">Search</button>
      </form>
      <SearchMovies movies={searchMovies} />
    </div>
  );
};

export default MoviesPage;
