import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'api';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function getReviews() {
      try {
        const reviews = await fetchMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    getReviews();
  }, [movieId]);

  return reviews.length > 0 ? (
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
