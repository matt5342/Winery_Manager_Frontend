import { authHeader } from "../_helpers";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://winery-manager.herokuapp.com/'

export const sectionService = {
	submit,
	getAll,
	delete: _delete
}

function submit(section) {
	const { name } = section
	return axios.post(`${BASE_URL}/section`, { name }, { headers: authHeader() })
}

function getAll() {
    return axios.get(`${BASE_URL}/sections`, { headers: authHeader() })
}

function _delete(id) {
	return axios.delete(`${BASE_URL}/sections/${id}`, { headers: authHeader() })
}