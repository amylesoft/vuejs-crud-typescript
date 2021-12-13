import { User } from "../store/modules/types"
import HttpCommon from "./HttpCommon"
import { ErrorWrapper, ResponseWrapper } from "./util"
export default class UserService {
    http: HttpCommon

    constructor() {
        this.http = new HttpCommon("users")
    }

    findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get()
                .then((response) => {
                    resolve(new ResponseWrapper(response).data)
                })
                .catch((error) => {
                    reject(new ErrorWrapper(error))
                })
        })
    }

    update(id: string, data = {}): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http
                .patch(id, data)
                .then((response) => {
                    resolve(new ResponseWrapper(response).data)
                })
                .catch((error) => {
                    reject(new ErrorWrapper(error))
                })
        })
    }

    create(data = {}): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http
                .post("", data)
                .then((response) => {
                    resolve(new ResponseWrapper(response).data)
                })
                .catch((error) => {
                    reject(new ErrorWrapper(error))
                })
        })
    }

    delete(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http
                .delete(id)
                .then((response) => {
                    resolve(new ResponseWrapper(response).data)
                })
                .catch((error) => {
                    reject(new ErrorWrapper(error))
                })
        })
    }
}
