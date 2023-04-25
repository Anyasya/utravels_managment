// import {appTypes} from '../types/appTypes'


const initialState = {
    notifications: null,
    fast_object_create: null
}

export const appReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // case appTypes.SET_NOTIFICATION: {
        //     return {...state, notifications: payload ? [payload] : null}
        // }
        // case appTypes.OPEN_CREATE_OBJECT: {
        //     return {...state, fast_object_create: payload ? payload : null}
        // }
        default:
            return state
    }
}
