import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Symfony API URL
})

export default api
