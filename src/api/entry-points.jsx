// *************** API ROUTES ***************

// AUTH ======================================================================================================================

export const SIGN_IN = `/auth` // POST + { "email": "string", "password": "string" }
export const LOGOUT = `/auth/logout` // POST
export const VERIFY = `/auth/verify` // GET

// CLIENT CORE ======================================================================================================================


export const GET_ORDER_LIST = `/order/list` // GET
export const GET_ORDER_FIELDS = `/order/fields` // GET
export const GET_ORDER_GUEST_FIELDS = `/order/guest/fields` // GET
export const GET_ORDER_DATA  = (link) => `/order?link=${link}` // GET
export const CONFIRM_GUEST  = (id) => `order/guest/confirm?guest_id=${id}` // GET
export const GET_PAYMENT_LINK  = (id) => `billing/get_payment_url?order_id=${id}` // GET
export const DELETE_ORDER  = (id) => `order?order_id=${id}` // DELETE

export const UPDATE_ORDER_DATA  = () => `/order` // PATCH
export const SAVE_ORDER_DATA  = () => `/order` // POST
