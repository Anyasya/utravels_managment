import React from 'react';
import './index.css'
// import Spinner from "../../Loadings/Spinner";
// import {motion} from 'framer-motion'
// import {SHOW_SPINNER_ANIMATION} from "../../../../constants/framer-motion-animations";

const DefaultButton = (props) => {
    const {
        text,
        onClick,
        height,
        width,
        style,
        border,
        loading,
        color,
        disabled,
        colorHover,
        onMouseOver,
        onMouseOut
    } = props

    return (
        <div {...{
            className: `DefaultButton padding-12-17 ${border && 'DefaultButtonBorder'} ${disabled && 'disabled'} flex-row align-center justify-center transition-default pointer`,
            onClick: loading ? null : onClick,
            style: {...style, width, height},
            onMouseOver,
            onMouseOut
        }}>
            <div {...{className: 'transition-default'}} style={{color, ':hover': colorHover}}>{text}</div>
            {/*<motion.div {...{*/}
            {/*    style: { marginLeft: loading ? 10: 0},*/}
            {/*    ...SHOW_SPINNER_ANIMATION(loading)*/}
            {/*}}>*/}
            {/*    <Spinner {...{loading, size: 15}}/>*/}
            {/*</motion.div>*/}
        </div>
    )
}

export default DefaultButton