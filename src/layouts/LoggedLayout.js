import React from 'react';
// import './index.css'
import {Outlet} from 'react-router-dom'
// import SideMenu from "../../components/elements/SideMenu";
// import {MAIN_LAYOUT_ANIMATION} from "../../constants/framer-motion-animations";
// import {motion} from 'framer-motion'

const LoggedLayout = () => {

    return (
        <div>
            {/*<motion.div {...{...MAIN_LAYOUT_ANIMATION, className: 'flex'}}>*/}
            {/*<SideMenu/>*/}
            <div {...{className: 'MainLayout_workWrapper flex'}}>
                <Outlet/>
            </div>
            {/*</motion.div>*/}
        </div>
    )
}

export default LoggedLayout
