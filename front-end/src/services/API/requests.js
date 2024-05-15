import axios from "axios";
import {BASE_URL} from '../constants.js'


export async function getAll(endpoint) {
    let result = { data: null, error: null }
    await axios.get(BASE_URL + endpoint).then((res) => {
        result = { ...result, data: res.data };
    }).catch((err) => {
        result = { ...result, error: err };
    });
    return(result)
}
export async function getOne(endpoint,id) {
    let result = { data: null, error: null }
    await axios.get(BASE_URL + endpoint+`/${id}`).then((res) => {
        result = { ...result, data: res.data };
    }).catch((err) => {
        result = { ...result, error: err };
    });
    return(result)
}
export async function post(endpoint, payload) {
    let result = { data: null, error: null }
    await axios.post(BASE_URL + endpoint, payload).then((res) => {
        result = { ...result, data: res.data }
    }).catch((err) => {
        result = { ...result, error: err }
    })
    return(result)
}
export async function patch(endpoint,id, payload) {
    let result = { data: null, error: null }
    await axios.patch(BASE_URL + endpoint+ `/${id}`, payload).then((res) => {
        result = { ...result, data: res.data }
    }).catch((err) => {
        result = { ...result, error: err }
    })
    return(result)
}


export async function delOne(endpoint,id) {
    let result = { data: null, error: null }
    await axios.delete(BASE_URL + endpoint+`/${id}`).then((res) => {
        result = { ...result, data: res.data };
    }).catch((err) => {
        result = { ...result, error: err };
    });
    return(result)
}


