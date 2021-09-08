import axios from 'axios'


const conn = axios.create({
    baseURL: 'http://bino.iotruck.com.br'
})


export default conn
