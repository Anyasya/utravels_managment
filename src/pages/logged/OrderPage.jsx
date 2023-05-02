import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.css'
import {Header} from "../../components/header";
import {ClientCard} from "../../components/ClientCard";
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";

export const OrderPage = () => {
    const [orderId, setOrderId] = useState(null)
    const [orderData, setOrderData] = useState(ORDERDATA)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        location?.state && setOrderId(location?.state)
    }, [])

    const handleInputChange = (key, value) => {
        // handleInputError(key, null)
        setOrderData(prevState => ({
            ...prevState, [key]: value
            // {...prevState[key]
            //     , value}
        }))
    }

    const handleInputChangeGuest = (index, key, value) => {
        let newState = Object.assign({}, orderData);
        newState.guests[index][key] = value;
        setOrderData(newState)

    }


    const addGuest = () => {
        setOrderData(prevState => ({
            ...prevState, guests: [...prevState.guests, {}]
        }))
    }

    const deleteGuest = (key) => {
        setOrderData(prevState => ({
            ...prevState, guests: prevState.guests.filter((_, i) => i !== key)
        }))
    }




    const saveOrder = () => {
        navigate('/')
    }

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Header/>
            <div className={'orderTitle'}>{orderId ? 'Редактирование заказа' : 'Новый заказ'}</div>
            <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 50}}>
                {HOTELFIELDS && orderData &&
                    HOTELFIELDS.map((item, key) => (
                        <div key={key} style={{width: '49%'}}>
                            <div
                                style={{fontWeight: 600}}>{item.placeholder[0].toUpperCase() + item.placeholder.slice(1)}</div>
                            <DefaultInput {...{
                                style: {marginTop: 10, height: 50, marginBottom: 10},
                                // type: user[field].type,
                                value: item.key ? orderData.hasOwnProperty(item.key) ? orderData[item.key] : `` : '',
                                placeholder: 'Введите данные',
                                onChange: (value) => handleInputChange(item.key, value),
                                // error: !!user[field].error,
                                // errorText: user[field].error
                            }}/>
                        </div>

                    ))}
            </div>
            {orderData.guests &&
                orderData.guests.map((item, key) => (
                    <div key={key}>
                        <div className={'orderTitle'} style={{
                            fontWeight: 600,
                            marginTop: 50,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{fontWeight: 600}}>{`Гость ${key + 1}`}</span>
                            <DefaultButton {...{
                                text: 'Удалить',
                                // loading,
                                onClick: ()=> deleteGuest(key),
                                // width: '100%',
                                height: 40,
                                // style: {marginTop: 50}
                                style: {background: '#878395'}
                            }}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            {CLIENTFIELDS &&
                                CLIENTFIELDS.map((item, key2) => (
                                    <div key={key2} style={{width: '49%'}}>
                                        <div
                                            style={{fontWeight: 600}}>{item.placeholder[0].toUpperCase() + item.placeholder.slice(1)}</div>
                                        <DefaultInput {...{
                                            style: {marginTop: 10, height: 50, marginBottom: 10},
                                            // type: user[field].type,
                                            value: orderData.guests[key] ? orderData.guests[key][item.key] ? orderData.guests[key][item.key] : '' : '',
                                            placeholder: 'Введите данные',
                                            onChange: (value) => handleInputChangeGuest(key, item.key, value),
                                            // error: !!user[field].error,
                                            // errorText: user[field].error
                                        }}/>
                                    </div>

                                ))}
                        </div>

                    </div>

                ))}
            <div>
                <DefaultButton {...{
                    text: 'Добавить гостя',
                    // loading,
                    onClick: ()=>addGuest(),
                    width: '100%',
                    height: 50,
                    // style: {marginTop: 50}
                    style: {background: '#878395', margin: '50px 0'}
                }}/>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 100}}>
                    <DefaultButton {...{
                        text: 'Отменить изменения',
                        // loading,
                        onClick: ()=>navigate('/'),
                        width: '49%',
                        height: 50,
                        style: {background: '#bcbac3'}
                    }}/>
                    <DefaultButton {...{
                        text: 'Сохранить',
                        // loading,
                        onClick: () => saveOrder(),
                        width: '49%',
                        height: 50,
                    }}/>
                </div>


            </div>


        </div>
    )
}


const HOTELFIELDS = [
    {
        id: 1,
        type: 'input',
        key: 'hotel',
        placeholder: 'Отель'
    },
    {
        id: 2,
        type: 'input',
        key: 'city',
        placeholder: 'Город'
    },
    {
        id: 3,
        type: 'input',
        key: 'from',
        placeholder: 'Откуда'
    },
    {
        id: 4,
        type: 'input',
        placeholder: 'Страна'
    },
]

const CLIENTFIELDS = [
    {
        id: 1,
        type: 'input',
        placeholder: 'Имя на русском',
        key: 'russianName',
    },
    {
        id: 2,
        type: 'input',
        placeholder: 'Имя на английском',
        key: 'englishName',
    },
    {
        id: 3,
        type: 'input',
        placeholder: 'Отчество на русском'
    },
    {
        id: 4,
        type: 'input',
        placeholder: 'Отчество на английском'
    },
    {
        id: 5,
        type: 'input',
        placeholder: 'Отчество на английском',
    },

]

const ORDERDATA = {
    hotel_name: 'HOTELL',
    city: 'SEVSK',
    guests: [
        {
            id: 1,
            name: 'DKDEK',
            russianName: 'РУСАК 1',
            englishName: 'DKDEK3'
        },
        {
            id: 2,
            name: 'РУСАК 2',
            russianName: 'РУСАК 2',
            englishName: 'DKDEK8'
        }
    ]


}
