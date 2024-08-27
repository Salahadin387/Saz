import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const response = await moviesApi.get('/authentication/token/new');
    const { data } = response;

    if (data.success) {
      localStorage.setItem('request_token', data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/approved`;
    } else {
      console.error('Failed to fetch token:', data.status_message);
    }
  } catch (error) {
    console.error('Error fetching authentication token:', error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (!token) {
    console.error('No request token found in localStorage.');
    return null;
  }

  try {
    const response = await moviesApi.post('/authentication/session/new', {
      request_token: token,
    });
    const { data } = response;

    if (data.success) {
      localStorage.setItem('session_id', data.session_id);
      return data.session_id;
    } else {
      console.error('Failed to create session ID:', data.status_message);
    }
  } catch (error) {
    console.error('Error creating session ID:', error);
  }

  return null;
};
