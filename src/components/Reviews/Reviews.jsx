import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getReviews() {
      try {
        setError(false);

        const reviews = await fetchMovieReviews(movieId);

        if (reviews.length) {
          setReviews(reviews);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }

    getReviews();
  }, [movieId]);

  return error ? (
    <p style={{ color: 'red' }}>
      Sorry! There was an error! Please try refreshing the page!
    </p>
  ) : reviews.length > 0 ? (
    <div>
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>{author}</h3>
            <div>{content}</div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    `We don't have any reviews for this movie.`
  );
};

export default Reviews;
