import React from 'react';
import SignIn from "../pages/unlogged/SignIn";
import {Navigate} from 'react-router-dom'
import UnloggedLayout from "../../src/layouts/UnloggedLayout";

export const unlogged = (root) => ([
    {
        path: `${root}`,
        element: <UnloggedLayout />,
        children: [
            {
                path: `${root}/sign-in`,
                element: <SignIn />,
            },
            // {
            //     path: `${root}/sign-up`,
            //     element: <SignUp />,
            // },
            {
                path: `${root}/*`,
                element: <Navigate {...{to: `${root}/sign-in`}} />,
            }
        ]
    }
])