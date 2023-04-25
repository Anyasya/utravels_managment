export const SUCCESS = 'SUCCESS'
export const INVALID = 'INVALID'
export const BAD = 'BAD'

const responseService = (kind, data) => ({ kind, data })

export { responseService }