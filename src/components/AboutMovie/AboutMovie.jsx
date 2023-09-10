import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'api';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

export const AboutMovie = () => {
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

  const { id, poster_path, title, vote_average, overview, genres } =
    movieDetails;

  return (
    <div>
      <button>Go back</button>
      {movieDetails ? (
        <div>
          <ul>
            <li key={id}>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : defaultImg
                }
                width={250}
                alt={title}
              />
              <h3>{title}</h3>
              <div>User score: {vote_average}</div>
              <div>
                Overview
                <br />
                {overview}
              </div>
              <ul>
                Genres
                <br />
                {genres &&
                  genres.map(({ id, name }) => <li key={id}>{name}</li>)}
              </ul>
            </li>
          </ul>
        </div>
      ) : (
        `We don't have any cast for this movie.`
      )}
    </div>
  );
};
