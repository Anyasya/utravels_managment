import React from 'react';
import {Outlet} from 'react-router-dom'
// import './index.css'
// import {MAIN_LAYOUT_ANIMATION} from "../../constants/framer-motion-animations";
// import {motion} from 'framer-motion'

const UnLoggedLayout = () => {

    return (
        <div>
        {/*<motion.div {...{*/}
        {/*    className: 'AuthContainer_mainLayout flex justify-center align-center',*/}
        {/*    ...MAIN_LAYOUT_ANIMATION*/}
        {/*}}>*/}
            <div {...{className: 'AuthContainer_mainLayout_formsContainer flex-column align-center'}}>
                <Outlet />
            </div>
        {/*</motion.div>*/}
        </div>
    )

}

export default UnLoggedLayout