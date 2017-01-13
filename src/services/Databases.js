import API from './API'


const get = () => API.get(`/databases`);
const createDB = (db) => API.post(`/databases`, db);
const updateDB = (id, db) => API.put(`/databases/${id}`, db);
const deleteDB = (db) => API.delete(`/databases/${db._id}`)

export default {get, createDB, updateDB, deleteDB}