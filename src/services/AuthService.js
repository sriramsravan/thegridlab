import axios from 'axios';
import { backendUrl } from '../config';

const BASE_URL = `${backendUrl}/api`;
const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const login = (email, password) => {
  return axiosAuth.post('/auth/login', { email, password }).then((res) => res.data);
};

const logout = () => {
  return axiosAuth.get('/auth/logout').then((res) => res.data);
};

export default { login, logout };
