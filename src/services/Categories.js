import API from './API'

const getCategories = () => API.get('/categories');
const getCategory = (id) => API.get(`/categories/${id}`);
const createCategory = (categoryName) => API.post(`/categories`, {name: categoryName});

export default {getCategories, getCategory, createCategory}