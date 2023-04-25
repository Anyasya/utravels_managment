import {userTypes} from '../types/userTypes'


const initialState = {
    isLogged: false,
    user: null,
    token: null
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case userTypes.INIT_USER: {
            // Для логаута юзера: payload = null
            return { ...state, user: payload, isLogged: !!payload }
        }
        case userTypes.SET_USER_TOKEN: {
            return { ...state, token: payload }
        }
        default:
            return state
    }
}