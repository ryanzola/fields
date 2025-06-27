import axios from 'axios';

const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Optional: useful if you're using auth/cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default $axios;