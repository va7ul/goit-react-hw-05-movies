import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const API_KEY = '98c1ed9c69ba3698f235695e3d42290c';

async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `/3/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

async function fetchSearchMovies(query) {
  try {
    const response = await axios.get(
      `/3/search/movie?query=${query}&api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovieDetails(id) {
  try {
    const response = await axios.get(`/3/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovieCast(id) {
  try {
    const response = await axios.get(
      `/3/movie/${id}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovieReviews(id) {
  try {
    const response = await axios.get(
      `/3/movie/${id}/reviews?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

export {
  fetchTrendingMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};
