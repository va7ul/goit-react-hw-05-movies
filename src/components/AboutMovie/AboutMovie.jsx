import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Wrapper, Image, List, Text, LinkBtn } from './AboutMovie.styled';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

export const AboutMovie = ({ movieDetails }) => {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');

  const { poster_path, title, vote_average, overview, genres } = movieDetails;

  return (
    <div>
      <LinkBtn to={backLinkHref.current}>
        <BsFillArrowLeftSquareFill style={{ color: 'orangered' }} size={20} />
        Go back
      </LinkBtn>
      {movieDetails ? (
        <Wrapper>
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : defaultImg
            }
            width={250}
            alt={title}
          />
          <div>
            <h2>{title}</h2>
            <Text>User score: {Math.round(vote_average * 100) / 100}</Text>
            <br />
            <h3>Overview</h3>
            <Text>{overview}</Text>
            <br />
            <h3>Genres</h3>
            <Text>
              <List>
                {genres &&
                  genres.map(({ id, name }) => <li key={id}>{name}</li>)}
              </List>
            </Text>
          </div>
        </Wrapper>
      ) : (
        `Oppsss! Something went wrong!`
      )}
    </div>
  );
};
