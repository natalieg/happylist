import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5010/api/'
})

const getAreaList = () => api.get('/areas')
const sendNewArea = (data) => api.post('/newArea', data)

const apis = {
    getAreaList,
    sendNewArea
}

export default apis