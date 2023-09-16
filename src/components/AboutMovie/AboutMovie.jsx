import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

export const AboutMovie = ({ movieDetails }) => {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');

  const { id, poster_path, title, vote_average, overview, genres } =
    movieDetails;

  return (
    <div>
      <Link to={backLinkHref.current}>Go back</Link>
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
              <div>User score: {Math.round(vote_average * 100) / 100}</div>
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
        `Oppsss! Something went wrong!`
      )}
    </div>
  );
};
