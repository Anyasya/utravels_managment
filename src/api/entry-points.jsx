// *************** API ROUTES ***************

export const VERSION_V2 = 'v2'

// AUTH ======================================================================================================================

export const SIGN_IN = `/auth` // POST + { "email": "string", "password": "string" }
export const SIGN_UP = `/reg` // POST + {"name": "string", "email": "string", "password": "string"}
export const LOGOUT = `/auth/logout` // POST
export const VERIFY = `/verify` // GET

// OBJECTS CORE ======================================================================================================================

// - views
export const GET_MULTIPLE_VIEW = (id) => `/view/multiple/${id}`
export const GET_SINGLE_VIEW = (id) => `/view/single/${id}`
export const GET_VIEWS = (query) => `/views${query ? '?' + query : ''}`
export const CREATE_VIEW = `/view/create`
export const UPDATE_VIEW = `/view/update`

// - objects
export const GET_OBJECTS = (query) => `/objects${query ? '?' + query : ''}`
export const GET_OBJECT_FILTERS = `/object/filters`
export const GET_OBJECT_SORTS = `/object/sorts`
export const GET_OBJECT = (query) => `/object${query ? '?' + query : ''}`
export const CREATE_OBJECT = (query) => `/object${query ? '?' + query : ''}`
export const GET_OBJECT_EMPTY_SCHEMA = (query) => `/object/get${query ? '?' + query : ''}`
export const UPDATE_OBJECT = (id) => `/object/${id}`
export const DELETE_OBJECT = (id) => `/object/${id}`
export const ADD_NESTED_OBJECT = (id) => `/object/${id}/related-object`
export const REMOVE_NESTED_OBJECT = (id) => `/object/${id}/related-object`
export const UPDATE_NESTED_OBJECT = (id) => `/object/${id}/related-object`

// - schemas
export const GET_SCHEMAS = `/schemas`
export const GET_PAYMENT_LINK = (query) =>  `/add-money?sum=${query}`
export const GET_CAMPAIGN_CARDS = `wa/get-campaigns-cards`
export const CREATE_SCHEMA = `/schema`
export const UPDATE_SCHEMA = (schema_id) => `/schema/${schema_id}`
export const ADD_SCHEMA_FIELD = (id) => `/schema/field/${id}`
export const REMOVE_SCHEMA_FIELD = (id) => `/schema/field/${id}`
export const UPDATE_SCHEMA_FIELD = (id) => `/schema/field/${id}`


//- wa
export const GET_SCRIPTS_ALL = (query) => `wa/get-all-scripts${query ? '?' + query : ''}`
export const GET_ALGORITHMS = (query) => `wa/get-campaigns-algorithm${query ? '?' + query : ''}`
export const SET_ALGORITHM = (query) => `wa/set-campaigns-algorithm${query ? '?' + query : ''}`
export const UPDATE_FIELD_SCRIPT = `wa/change-script-step`
export const CREATE_FIELD_SCRIPT = `wa/create-script-step`
export const DELETE_FIELD_SCRIPT = (query) => `wa/delete-script-step${query ? '?' + query : ''}`
export const ADD_SCRIPT_COMPANY = (query) => `wa/add-script-campaign${query ? '?' + query : ''}`
export const REMOVE_SCRIPT_COMPANY = (query) => `wa/remove-script-campaign${query ? '?' + query : ''}`
export const CREATE_SCRIPT_COMPANY = (query) => `wa/create-script${query ? '?' + query : ''}`
export const CHANGE_ACTIVE_STATUS = (query) => `wa/change-active-campaign?campaign_id=${query}`


export const GET_GRAPHICS = `/wa/get-graph`
// export const GET_GRAPHICS = `/get-graph-json`
export const GET_CAMPAIGNS = `/get-campaigns-reports`

export const POST_URLS = `/set-urls`
export const CREATE_CAMPAIGN = `/wa/create-campaigns`



export const GET_CAMPAIGN = (query) => `/get-campaigns?id=${query}`
export const GET_TARIFF = `/get-wa-tariff`
export const GET_TARIFF_PAY = (query) =>`/pay-validation-tariff?num=${query}`
export const PAY_TARIFF = (query) =>`/pay-tariff?type=${query.type}&num=${query.num}`


export const ADD_PHONES = `/wa/add-phones`
export const ADD_PHONES_CSV = `/wa/upload-phones-csv`


export const GET_MESSAGE_IMAGE = (query) => `/get-message-image?message_num=${query.num}&campaign_id=${query.id}`
export const SET_MESSAGE_IMAGE = (query) => `/set-message-image?message_num=${query.num}&campaign_id=${query.id}`


export const GET_REPORTS =  `/wa/get-reports`

export const GET_REPORT_FILTERS  = `wa/get-reports-filter`



