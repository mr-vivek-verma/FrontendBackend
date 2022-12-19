import axios from 'axios';

const customAxios = axios.create({
  baseUrl: 'http://localhost:5001/api/v1/',
});

export { customAxios };
