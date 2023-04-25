import React from 'react';
import {useRoutes, Navigate} from "react-router-dom";
import {logged} from "./router/logged";
import {ProtectedLayout} from "./layouts/ProtectedLayout";
import {unlogged} from "./router/unlogged";

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