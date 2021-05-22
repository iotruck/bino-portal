import axios from 'axios'


const conn = axios.create({
    baseURL: 'http://localhost:8080'
})


export default conn