import API from './API'

const getCategories = () => API.get('/categories');
const getCategory = (id) => API.get(`/categories/${id}`);
const updateCategory = (id, category) => API.put(`/categories/${id}`, category);
const createCategory = (categoryName) => API.post(`/categories`, {name: categoryName});

export default {getCategories, getCategory, createCategory, updateCategory}