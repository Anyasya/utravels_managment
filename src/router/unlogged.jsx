import React from 'react';
import SignIn from "../pages/unlogged/SignIn";
import {Navigate} from 'react-router-dom'
import UnloggedLayout from "../../src/layouts/UnloggedLayout";
import {ConfirmPage} from "../pages/logged/ConfirmPage";

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
                path: `${root}/confirm`,
                element: <ConfirmPage />,
            },
            {
                path: `${root}/confirm/:id`,
                element: <ConfirmPage/>,
            },
            {
                path: `${root}/*`,
                element: <Navigate {...{to: `${root}/sign-in`}} />,
            }
        ]
    }
])