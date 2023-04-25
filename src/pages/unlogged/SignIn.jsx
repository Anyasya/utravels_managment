import React from 'react';
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";
import {useAuth} from "../../providers/AuthProvider";
import {useNavigate} from "react-router-dom";

// User SignIn Schema that contains 2 fields
const user_auth = {
    username: {
        placeholder: 'Email',
        value: '',
        error: null,
        type: 'email'
    },
    password: {
        placeholder: 'Password',
        value: '',
        error: null,
        type: 'password'
    }
}

const SignIn = () => {

    const [user, setUser] = React.useState(user_auth)
    // const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    //
    const navigate = useNavigate()
    const { loginAction, verifyAction } = useAuth()
    //
    const handleInputChange = (key, value) => {
        handleInputError(key, null)
        console.log(key,value,user)
        setUser(prevState => ({...prevState, [key]: {...prevState[key], value}}))
    }

    const handleInputError = (key, error) => {
        setUser(prevState => ({...prevState, [key]: {...prevState[key], error}}))
    }
    //
    // /**
    //  * @param {object} data
    //  */
    const setUserCredentials = (data) => {
        localStorage.setItem('access_token', data.access_token)
        verifyAction().then(() => {
            navigate('/')
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleSignInUser = () => {
        let valid = true
        Object.keys(user).map(key => {
            if(!user[key].value) {
                handleInputError(key, 'Заполните поле')
                valid = false
            }
        })
        if(valid) {
            let body = {}
            Object.keys(user).map(key => {
                body[key] = user[key].value.toString()
            })
            console.log(body,'bodyy')
            setLoading(true)
            loginAction(body).then((result) => {
                console.log(result,'RESILT')
                setUserCredentials(result.data)
            }).catch((e) => {
                Object.keys(user).map(key => {
                    handleInputError(key, 'Данные введены неверно')
                })
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
        }
    }

    return (
        <div {...{className: 'AuthFormContainer flex-column'}}>
            <h1>Вход в личный кабинет</h1>
            {
                Object.keys(user).map(field =>
                    <div {...{key: field}}>
                        <DefaultInput {...{
                            style: {marginTop: 25},
                            type: user[field].type,
                            value: user[field].value,
                            placeholder: user[field].placeholder,
                            onChange: (value) => handleInputChange(field, value),
                            error: !!user[field].error,
                            errorText: user[field].error
                        }}/>
                    </div>
                )
            }
            {/*<div {...{className: 'AuthFormContainer_questionsContainer flex-row align-center justify-between'}}>*/}
            {/*    <div {...{className: 'AuthFormContainer_questionsContainer_remember pointer transition-default'}}>*/}
            {/*        <input {...{*/}
            {/*            type: 'checkbox',*/}
            {/*            className: 'AuthFormContainer_questionsContainer_rememberInput',*/}
            {/*            id: 'remember_me',*/}
            {/*            value: remember,*/}
            {/*            onChange: (e) => setRemember(e.target.value)*/}
            {/*        }}/>*/}
            {/*        <div {...{className: 'flex-row align-center', style: {marginTop: 10}}}>*/}
            {/*            <DefaultSwitcherSingle/>*/}
            {/*            <span {...{style: {marginLeft: 14}}}>Запомнить меня</span>*/}
            {/*        </div>*/}
            {/*        /!*<label {...{htmlFor: 'remember_me', className: 'flex-row align-center pointer'}}>*!/*/}
            {/*        /!*    <div {...{className: 'flex-row align-center justify-center'}}>*!/*/}
            {/*        /!*        <div></div>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*    <span>Запомнить меня</span>*!/*/}
            {/*        /!*</label>*!/*/}
            {/*    </div>*/}
            {/*    <div {...{className: 'AuthFormContainer_questionsContainer_forgotPassword pointer transition-default', style: {marginTop: 10}}}>Забыли пароль?</div>*/}
            {/*</div>*/}
            <DefaultButton {...{
                text: 'Войти',
                loading,
                onClick: handleSignInUser,
                width: '100%'
            }}/>
            {/*<div {...{className: 'AuthFormContainer_orAnother flex-row align-center justify-center'}}>*/}
            {/*    <div></div>*/}
            {/*    <div>или</div>*/}
            {/*</div>*/}
            {/*<DefaultButton {...{*/}
            {/*    onClick: () => navigate('/auth/sign-up'),*/}
            {/*    text: 'Зарегистрироваться',*/}
            {/*    border: true,*/}
            {/*    width: '100%'*/}
            {/*}}/>*/}
        </div>
    )
}

export default SignIn