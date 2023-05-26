import {api, ApiEndpoint} from '../index.jsx'
import * as client from '../entry-points.jsx'
import {SAVE_ORDER_DATA} from "../entry-points.jsx";

const WHERE = '/'
const schema = {}

const loginEndpoint = new ApiEndpoint(WHERE, api, schema)

const getOrderList = () => loginEndpoint.request(client.GET_ORDER_LIST, null, 'get')
const getOrderFields = () => loginEndpoint.request(client.GET_ORDER_FIELDS, null, 'get')
const getOrderGuestFields = () => loginEndpoint.request(client.GET_ORDER_GUEST_FIELDS, null, 'get')
const getOrderData = (link) => loginEndpoint.request(client.GET_ORDER_DATA(link), null, 'get')
const updateOrderData = (data) => loginEndpoint.request(client.UPDATE_ORDER_DATA(), data, 'patch')
const saveOrderData = (data) => loginEndpoint.request(client.SAVE_ORDER_DATA(), data, 'post')
const confirmGuest = (id) => loginEndpoint.request(client.CONFIRM_GUEST(id), null, 'patch')
const getPaymentLink = (id) => loginEndpoint.request(client.GET_PAYMENT_LINK(id), null, 'get')
const deleteOrder = (id) => loginEndpoint.request(client.DELETE_ORDER(id), null, 'delete')


export {
    getOrderList,
    getOrderFields,
    getOrderData,
    getOrderGuestFields,
    updateOrderData,
    confirmGuest,
    getPaymentLink,
    saveOrderData,
    deleteOrder
}