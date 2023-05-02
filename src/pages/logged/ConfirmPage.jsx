import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.css'
import {Header} from "../../components/header";
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";

export const ConfirmPage = () => {
    const [orderId, setOrderId] = useState(ORDERDATA)
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
        console.log(orderData)
    }


    const saveOrder = () => {
        navigate('/')
    }

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Header guest={true}/>
            <div className={'orderInfo'}>
                <div className="orderInfo__topInfo">
                    <div className="orderInfo__left">
                        <div className="orderInfo__leftName">{orderData.hotel_name}</div>
                        <div className="orderInfo__leftCountry">{orderData.hotel_country}</div>
                    </div>
                    <div className="orderInfo__right">
                        <div className="orderInfo__rightName">К ОПЛАТЕ</div>
                        <div className="orderInfo__rightCountry">{orderData.price} ₽</div>
                    </div>
                </div>
                <div className="orderInfo__bottomInfo">
                    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 50}}>
                        {HOTELFIELDS && orderData &&
                            HOTELFIELDS.map((item, key) => (
                                <div key={key} style={{width: '25%'}}>
                                    <div className={'orderInfo__bottomInfoTitle'}>{item.placeholder[0].toUpperCase() + item.placeholder.slice(1)}</div>
                                    <div className={'orderInfo__bottomInfoValue'}>{item.key ? orderData.hasOwnProperty(item.key) ? orderData[item.key] : `` : ''}</div>

                                </div>

                            ))}
                    </div>

                </div>

            </div>
            <div className={'orderTitle'}>Паспортные данные</div>


            {orderData.guests &&
                orderData.guests.map((item, key) => (
                    <div key={key} className={'confirmGuest'}>
                        <div className={'orderTitle'} style={{
                            fontWeight: 600,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div className={'orderTitleRusName'}>BVZ AFVBKBX</div>
                                <div className={'orderTitleEngName'}>ИМЯ ФАМИЛИЯ</div>
                            </div>
                            <DefaultButton {...{
                                text:  `${item.approved ? 'Данные подтверждены':'Подтвердить'}`,
                                // loading,
                                onClick: () => deleteGuest(key),
                                // width: '100%',
                                height: 40,
                                // style: {marginTop: 50}
                                style: {background: item.approved ? '#878395': '#FF5104' }
                            }}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            {CLIENTFIELDS &&
                                CLIENTFIELDS.map((item, key2) => (
                                    <div key={key2} style={{width: '25%', marginBottom: 20}}>
                                        <div className={'confirmGuestTitle'}>{item.placeholder[0].toUpperCase() + item.placeholder.slice(1)}</div>
                                        <div className={'confirmGuestValue'}>{orderData.guests[key] ? orderData.guests[key][item.key] ? orderData.guests[key][item.key] : '' : ''}</div>
                                    </div>

                                ))}
                        </div>

                    </div>

                ))}
            <div>
                <DefaultButton {...{
                    text: 'Перейти к оплате',
                    // loading,
                    onClick: () => addGuest(),
                    width: '100%',
                    height: 50,
                    // style: {marginTop: 50}
                    style: {background: '#FF5104', margin: '50px 0'}
                }}/>
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
    hotel_country: 'NEHRHU',
    price: 48545,
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
