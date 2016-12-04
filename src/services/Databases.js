import API from './API'


const get = () => API.get(`/databases`);
const createDB = (db) => API.post(`/databases`, db);
const deleteDB = (db) => API.delete(`/databases/${db._id}`)

export default {get, createDB, deleteDB}