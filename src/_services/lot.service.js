import { authHeader } from "../_helpers";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://winery-manager.herokuapp.com/'

export const lotService = {
	submit,
	getAll,
	delete: _delete
}

function submit(lot) {
	const { name, volume, vintage, color, status, tank_id } = lot
	return axios.post(`${BASE_URL}/lots/${tank_id}`, { name, volume, vintage, color, status }, { headers: authHeader() })
}

function getAll() {
    return axios.get(`${BASE_URL}/lots`, { headers: authHeader() })
}

function _delete(id) {
	return axios.delete(`${BASE_URL}/lots/${id}`, { headers: authHeader() })
}