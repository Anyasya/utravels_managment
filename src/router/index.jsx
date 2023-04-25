import React from 'react';
import {useRoutes, Navigate} from "react-router-dom";
import {ProtectedLayout} from "../layouts/ProtectedLayout";
import {logged} from "./logged";


const Router = () => {

    const router = [
        {
            path: "/",
            element: <ProtectedLayout/>,
            children: [...logged(""), ...unlogged("/auth")]
        },
        // {
        //     path: "/*",
        //     element: <Page404/>
        // },
        // {
        //     path: '*',
        //     element: <Navigate {...{to: '/'}}/>
        // }
    ];

    return useRoutes(router)
}

export default Router