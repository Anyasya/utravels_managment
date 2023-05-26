import axios from 'axios'
import { Api, ApiEndpoint, RESPONSE_TYPE_BLOB } from './api-service'

let NODE_ENV = 'development'

// process.env.NODE_ENV replaced to NODE_ENV
// if (NODE_ENV !== 'production') {
//     require('../helpers/mock-server/mock-server')
// }

// const HOST = process.env.URL_API
// const HOST = 'https://uhead-backend-master.k8s.caltat.net/'
export const HOST = 'https://new.utravels.ru/api/'

const client = axios.create({
    baseURL: HOST,
    // withCredentials: true
})

client.interceptors.request.use(
    config => {
        let access_token = localStorage.getItem('access_token')
        if (access_token !== null) {
            config.headers.Authorization = 'Bearer ' + access_token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const logOut = async () => {
    console.log('unauthorize')
}


const api = new Api(client, logOut)
export { api, ApiEndpoint, RESPONSE_TYPE_BLOB }