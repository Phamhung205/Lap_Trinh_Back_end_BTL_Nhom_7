import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ten-backend-cua-ban.com/api', // Thay bằng URL Backend của bạn sau này
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMatchResults = () => api.get('/matches');
export default api;