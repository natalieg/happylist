import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5010/api/'
})

const getAreaList = () => api.get('/areas')
const sendNewArea = (data) => api.post('/newArea', data)
const sendNewTodo = (data) => api.post('/newTodo', data)
const getAreaTodos = (data) => api.post('/getTodos', data)
const deleteArea = (data) => api.delete('./deleteArea', data)

const apis = {
    getAreaList,
    sendNewArea,
    sendNewTodo,
    getAreaTodos,
    deleteArea
}

export default apis