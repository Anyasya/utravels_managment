import { api, ApiEndpoint } from '../index.jsx'
import * as auth from '../entry-points.jsx'

const WHERE = '/'
const schema = {}

const loginEndpoint = new ApiEndpoint(WHERE, api, schema)

const signIn = (payload) => loginEndpoint.request(auth.SIGN_IN, payload, 'post')

const logOut = () => loginEndpoint.request(auth.LOGOUT, null, 'post')

const verify = () => loginEndpoint.request(auth.VERIFY, null, 'get')


export { signIn, logOut, verify }