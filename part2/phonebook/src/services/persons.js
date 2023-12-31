import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"; // /api/persons for production deploy

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (newObject) => {
    return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteObj = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deleteObj };
