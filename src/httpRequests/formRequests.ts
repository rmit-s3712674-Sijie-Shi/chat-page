import axios, { AxiosResponse } from "axios";

const BaseUrl = "http://localhost:3001"
export function getUserForms(userId: string) {
    const result = axios.post(BaseUrl + "/getuserforms", { id: userId })
        .then(res => res.data)
        .catch(err => err)
    return result
}