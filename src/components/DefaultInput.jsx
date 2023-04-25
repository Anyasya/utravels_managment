import React from 'react';
import './index.css'

/**
 * @param {
 *     {
 *      value:string,
 *      placeholder: string,
 *      error: boolean,
 *      errorText: string,
 *      background: string,
 *      onChange: function,
 *      type: string,
 *      onSubmit: function,
 *      style: object,
 *     }
 * } props
 * @returns {JSX.Element}
 */

const DefaultInput = (props) => {

    const {
        value,
        placeholder,
        error,
        errorText,
        background,
        onChange,
        type,
        min,
        max,
        onSubmit,
        style,
        disabled
    } = props

    return (
        <div {...{className: 'DefaultInputContainer', style}}>
            <input {...{
                className: `DefaultInput ${background && 'DefaultInputBackground'} ${error && 'DefaultInputError'}`,
                placeholder,
                value: value ?? "",
                type: type ? type : 'text',
                onChange: (e) => onChange(e.target.value),
                onSubmit: onSubmit ? onSubmit : null,
                min: min ? min : null,
                max: max ? max : null,
                disabled,
            }}/>
            <div></div>
            {errorText && <div {...{className: 'DefaultInputContainerErrorText'}}>{errorText}</div>}
        </div>
    )
}

export default DefaultInput