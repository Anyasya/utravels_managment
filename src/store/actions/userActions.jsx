import {userTypes} from "../types/userTypes";

export const initUser = (payload) => {
    return {
        type: userTypes.INIT_USER,
        payload
    }
}
