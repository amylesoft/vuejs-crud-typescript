import { AxiosError, AxiosResponse } from "axios"

/**
 * Create instant, which represent response object
 * @param {Object} [response] - axios response object
 */
export class ResponseWrapper {
    data: any // eslint-disable-line

    constructor(response: AxiosResponse) {
        this.data = response.data
    }
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 */
export class ErrorWrapper extends Error {
    message: string
    statusCode: number | undefined

    constructor(error: AxiosError) {
        super()
        this.statusCode = error.response?.data.statusCode
        this.message = error.response?.data.message
    }
}
