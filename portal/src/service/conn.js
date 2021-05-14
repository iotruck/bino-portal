import axios from 'axios'

const conn = axios.create({
    baseURL: "http://192.168.100.12:8080/"
});

export default conn