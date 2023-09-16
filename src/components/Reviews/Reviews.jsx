import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'api';
import { Loader } from 'components/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getReviews() {
      try {
        setLoading(true);
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    getReviews();
  }, [movieId]);

  return loading ? (
    <Loader />
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
