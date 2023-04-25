import { responseService, BAD } from './response-service'

const errorService = (status, message) => responseService(BAD, { error: message, status: status })

export { errorService }