import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

// axiosAuth.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosAuth;
