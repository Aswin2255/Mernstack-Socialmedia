import axios from 'axios';

const baseURL = 'http://localhost:6001/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // If you need to send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
