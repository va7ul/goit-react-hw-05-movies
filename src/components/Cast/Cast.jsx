import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'api';
import { List, Image } from './Cast.styled';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getCast() {
      try {
        setError(false);

        const cast = await fetchMovieCast(movieId);

        if (cast.length) {
          setCast(cast);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }

    getCast();
  }, [movieId]);

  return error ? (
    <p style={{ color: 'red' }}>
      Sorry! There was an error! Please try refreshing the page!
    </p>
  ) : cast.length > 0 ? (
    <div>
      <hr />
      <List>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <Image
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : defaultImg
              }
              width={250}
              alt={name}
            />
            <div>
              <h3>{name}</h3>
              <p>{character}</p>
            </div>
          </li>
        ))}
      </List>
    </div>
  ) : (
    `We don't have any cast for this movie.`
  );
};

export default Cast;
