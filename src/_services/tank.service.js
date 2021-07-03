import { authHeader } from "../_helpers";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://winery-manager.herokuapp.com/'

export const tankService = {
	submit,
	getAll,
    getSection,
	delete: _delete
}

function submit(tank) {
	const { name, volume, matererial, status, xaxis, yaxis, width, height, section_id } = tank
	return axios.post(`${BASE_URL}/section/${section_id}/new_tank`, { name, volume, matererial, status, xaxis, yaxis, wigth, height }, { headers: authHeader() })
}

function getAll() {
    return axios.get(`${BASE_URL}/tanks`, { headers: authHeader() })
}

function getSection(section_id) {
    return axios.get(`${BASE_URL}/section/${section_id}/tanks`, { headers: authHeader() })
}

function _delete(id) {
	return axios.delete(`${BASE_URL}/tanks/${id}`, { headers: authHeader() })
}