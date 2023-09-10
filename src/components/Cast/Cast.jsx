import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from 'api';

const defaultImg =
  '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getCast() {
      try {
        const cast = await fetchMovieCast(movieId);
        setCast(cast);
      } catch (error) {
        console.log(error);
      }
    }

    getCast();
  }, [movieId]);

  return cast.length > 0 ? (
    <div>
      <ul>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : defaultImg
              }
              width={250}
              alt={name}
            />
            <h3>{name}</h3>
            <div>{character}</div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    `We don't have any cast for this movie.`
  );
};
