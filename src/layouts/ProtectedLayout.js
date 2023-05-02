import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, Outlet} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";

export const ProtectedLayout = () => {

    const { token, verifyAction, user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const [isInit, setIsInit] = useState(false)


    // Verify user action
    useEffect(() => {
        verifyAction().then(() => {
            // All is okay
        }).catch(e => {
            // console.log(e)
        }).finally(() => {
            setIsInit(true)
        })
    }, [])

    // Wait for verify action for start routing
    useEffect(() => {
        if(isInit) {
            if (!token && !user) {
                navigate("/auth/sign-in", { replace: true });
            } else {
                if(location.pathname.includes('auth')) {
                    navigate("/auth/confirm", { replace: true });
                }
            }
        }
    }, [token, user, isInit])

    if(isInit) {
        return (
            <div {...{className: 'MainLayout'}}>
                <Outlet/>
            </div>
        );
    } else return null;
};
