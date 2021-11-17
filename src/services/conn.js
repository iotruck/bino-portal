import axios from 'axios'


const conn = axios.create({
    baseURL: 'https://bino.iotruck.com.br'
})


export default conn
