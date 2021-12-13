import axios, { AxiosInstance, AxiosPromise } from "axios"

const API_URL = process.env.VUE_APP_API_URL

export default class HttpCommon {
    apiClient: AxiosInstance

    constructor(subURL = "") {
        let baseURL = API_URL
        if (subURL) {
            baseURL += `/${subURL}`
        }
        this.apiClient = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    get(url = ""): AxiosPromise {
        return this.apiClient.get(url)
    }

    post(url = "", data = {}): AxiosPromise {
        return this.apiClient.post(url, data)
    }

    patch(url = "", data = {}): AxiosPromise {
        return this.apiClient.patch(url, data)
    }

    delete(url = ""): AxiosPromise {
        return this.apiClient.delete(url)
    }
}
