import { Link, Outlet } from 'react-router-dom';
import { AboutMovie } from 'components/AboutMovie/AboutMovie';

const MoviesDetailsPage = () => {
  return (
    <>
      <AboutMovie />
      <div>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MoviesDetailsPage;
