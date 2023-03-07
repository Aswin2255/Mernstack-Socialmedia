import Axios from 'axios'
const bu = 'http://localhost:3001'
const axios = Axios.create({
    baseURL:bu,
    withCredentials:true
})
export default axios