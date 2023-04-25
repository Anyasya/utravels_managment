import Ajv from 'ajv'
import {INVALID, responseService, SUCCESS} from '../helpers/response-service'
import {errorService} from '../helpers/error-service'
import store from '../store/store'
// import {setNotification} from "../store/actions/appActions";
import {API_RESPONSE_CODES,
    // NOTIFICATION_TYPES
} from "../constants/types";

const ajv = new Ajv()

export const RESPONSE_TYPE_JSON = 'json'
export const RESPONSE_TYPE_BLOB = 'blob'

class Api {
    constructor (client) {
        this.client = client
        this.client.interceptors.response.use((response) => {
            return response
        }, function (error) {
            console.log(error.response)
            if(error.response.status === API_RESPONSE_CODES.VALIDATION_ERROR) {
                // store.dispatch(setNotification({
                //     type: NOTIFICATION_TYPES.WARNING,
                //     text: 'Номера телефонов не были добавлены: они не прошли валидацию.'
                // }))
            }
            if(error.response.status === API_RESPONSE_CODES.SERVER_ERROR) {
                // store.dispatch(setNotification({
                //     type: NOTIFICATION_TYPES.ERROR,
                //     text: 'Server Internal Error, sorry, we fix it ASAP'
                // }))
            }
            if (error.response.status === API_RESPONSE_CODES.AUTH_ERROR) {
                localStorage.clear();
            }
            if(error.response.status === API_RESPONSE_CODES.UNDEFINED_ERROR) {
                // store.dispatch(setNotification({
                //     type: NOTIFICATION_TYPES.ERROR,
                //     text: 'Невозможно загрузить данные, попробуйте позднее.'
                // }))
            }
            return Promise.reject(error.response)
        })
    }
    async request (url, data = null, method = 'get', params = null) {
        try {
            return await this.client({url, data, method, params})
        } catch (e) {
            return Promise.reject(e)
        }
    }
}

class ApiEndpoint {
    constructor (where, api, schema) {
        this.where = where
        this.api = api
        this.schema = schema
        this.validate = ajv.compile(this.schema)
    }

    validateResult (response) {
        return this.validate(response)
    }

    transferResult (response) {
        if (this.validateResult(response)) {
            return responseService(SUCCESS, response)
        }
        console.log('%c%s', 'color: yellow;font-size: 1.2rem', `Invalid data from ${this.where}`)
        return responseService(INVALID, null)
    }

    async request (url, data = {}, method = 'get', responseType = RESPONSE_TYPE_JSON, params = {}) {
        try {
            const response = await this.api.request(url, data, method, params, responseType)
            return this.transferResult(response.data)
        } catch (e) {
            return errorService(e.status, e.data)
        }
    }
}

export { Api, ApiEndpoint }