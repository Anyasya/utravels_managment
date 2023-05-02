import React from 'react';
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";
import {useAuth} from "../../providers/AuthProvider";
import {useNavigate} from "react-router-dom";

// User SignIn Schema that contains 2 fields
const user_auth = {
    username: {
        placeholder: 'логин',
        value: '',
        error: null,
        // type: 'email'
    },
    password: {
        placeholder: 'пароль',
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
        // CHANGED
        if(valid) {
            let body = {}
            Object.keys(user).map(key => {
                body[key] = user[key].value.toString()
            })
            setLoading(true)
            loginAction(body).then((result) => {
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
            <h1 style={{marginBottom: 55}}>Вход в личный кабинет</h1>
            {
                Object.keys(user).map(field =>
                    <div {...{key: field}}>
                        <div style={{fontWeight: 600}}>{user[field].placeholder[0].toUpperCase() + user[field].placeholder.slice(1)}</div>
                        <DefaultInput {...{
                            style: {marginTop: 10, height: 50, marginBottom: 10},
                            type: user[field].type,
                            value: user[field].value,
                            placeholder: `Введите ${user[field].placeholder}`,
                            onChange: (value) => handleInputChange(field, value),
                            error: !!user[field].error,
                            errorText: user[field].error
                        }}/>
                    </div>
                )
            }
            <DefaultButton {...{
                text: 'Войти',
                loading,
                onClick: handleSignInUser,
                width: '100%',
                height: 50,
                style: {marginTop: 50}
            }}/>
        </div>
    )
}

export default SignIn