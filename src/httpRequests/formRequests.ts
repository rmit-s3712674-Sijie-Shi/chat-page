import axios, { AxiosResponse } from "axios";

const BaseUrl = "http://localhost:3001"
export function getUserForms(userId: string) {
    const token = localStorage.getItem(userId)
    const result = axios.get(BaseUrl + "/getuserforms", {headers: {
        Authorization: `Bearer ${token}`
    }})
        .then(res => res.data)
        .catch(err => err)
    return result
}

