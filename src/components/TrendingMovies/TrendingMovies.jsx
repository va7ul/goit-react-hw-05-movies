import { Link, useLocation } from 'react-router-dom';
import { Title, List, Image, FilmName } from './TrendingMovies.styled';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

export const TrendingMovies = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <Title>Trending today</Title>
      <List>
        {movies.map(({ id, poster_path, title }) => (
          <li key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              <Image
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : defaultImg
                }
                width={250}
                alt={title}
              />
              <FilmName>{title}</FilmName>
            </Link>
          </li>
        ))}
      </List>
    </div>
  );
};
