import React from 'react';
import SignIn from "../src/pages/unlogged/SignIn";
import {Navigate} from 'react-router-dom'
import UnloggedLayout from "./layouts/UnloggedLayout";

export const unlogged = (root) => ([
    {
        path: `${root}`,
        element: <UnloggedLayout />,
        children: [
            {
                path: `${root}/sign-in`,
                element: <SignIn />,
            },
            {
                path: `${root}/*`,
                element: <Navigate {...{to: `${root}/sign-in`}} />,
            }
        ]
    }
])