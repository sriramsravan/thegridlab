import axios from 'axios';
import { backendUrl } from '../config';

const BASE_URL =`${backendUrl}/api`;
const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials:true
});

axiosAuth.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAuth;
