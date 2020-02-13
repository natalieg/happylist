import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5010/api/'
})

const getAreaList = () => api.get('/areas')

const apis = {
    getAreaList
}

export default apis