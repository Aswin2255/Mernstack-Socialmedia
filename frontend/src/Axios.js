import Axios from 'axios'
// for local host
//const bu = 'http://localhost:3001/api'
//for production
const bu = 'https://www.connectiflix.site/api'
const axios = Axios.create({
    baseURL:bu,
    withCredentials:true
})
export default axios