import React, {createContext, useContext, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {logOut,signIn, verify} from "../../api/routes/auth";
import {initUser} from "../../store/actions/userActions";
import {BAD, SUCCESS} from "../../helpers/response-service";
import axios from "axios";

const AuthContext = createContext()

/**
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthProvider = ({children}) => {

    const {user} = useSelector(state => state.user)
    const [token, setToken] = useLocalStorage("access_token", null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginAction = async (payload) => {
            const formData = new FormData()
            for (const item in payload) {
                formData.append(item, payload[item])
            }
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    url: "https://new.utravels.ru/api/auth",
                    data: formData
                }).then(result => {
                    if ([200, 201].includes(result.status)) {
                        resolve(result)
                    } else {
                        reject(result)
                    }
                }).catch((e) => reject(e))
            })
        };

    // Call this function to sign out logged user
    const logoutAction = () => {
        dispatch(initUser(null))
        setToken(null)
        navigate("/auth/sign-in", {replace: true});
        logOut().then((result) => {
            if (result.kind === SUCCESS) {
                dispatch(initUser(null))
                setToken(null)
                navigate("/auth/sign-in", {replace: true});
            }
        })
    };

    const verifyAction = () => {
        return new Promise((resolve, reject) => {
            verify().then(result => {
                switch (result.kind) {
                    case SUCCESS:
                        dispatch(initUser(result.data))
                        resolve(result.data)
                        let access_token = localStorage.getItem('access_token')
                        // axios.get('https://new.utravels.ru/api/get-user',{ headers: {Authorization: 'Bearer ' + access_token}}).then(response => (dispatch(initUser(response.data))))
                        break;
                    case BAD:
                        logoutAction()
                        reject(result.data)
                }
            }).catch((e) => {
                reject(e)
            })
        })
    }



    const value = useMemo(
        () => ({
            token,
            user,
            loginAction,
            logoutAction,
            verifyAction,
        }),
        [user, token]
    );
    return <AuthContext.Provider {...{value}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
