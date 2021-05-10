import axios from 'axios';

const api = axios.create({
    baseURL: "https://60993e7f99011f001714079d.mockapi.io/viagem"
});

export default api;