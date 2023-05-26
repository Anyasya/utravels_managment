import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.css'
import {Header} from "../../components/header";
import DefaultButton from "../../components/DefaultButton";
import {
    confirmGuest,
    getOrderData,
    getOrderFields,
    getOrderGuestFields, getPaymentLink,
    updateOrderData
} from "../../api/routes/client";

export const ConfirmPage = () => {
    // const [orderId, setOrderId] = useState(ORDERDATA)

    const [fields, setFields] = useState([])
    const [guestFields, setGuestFields] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState({})
    useEffect(() => {
       let order = (((location.pathname).split('/').slice(-1))[0])
        // location?.state && setOrderId(location?.state)
        getOrderData(order).then(result => {
            setOrderData(result.data)
        })
        getOrderGuestFields().then(result => {
            setGuestFields(result.data)
        })
        getOrderFields().then(result => {
            setFields(result.data)
        })
    }, [])


    const handleInputChange = (index,key, value, id) => {
        confirmGuest(id).then(result => {
            let newState = Object.assign({}, orderData);
            newState.guests[index][key] = value;
            setOrderData(newState)

        })
    }



    function redirectToPay() {
        getPaymentLink(orderData.id).then(result => {
            window.open(result.data, "_blank", "noreferrer")
            })
        // updateOrderData(orderData).then(result => {
        //     console.log('ok')
        // })


    }

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Header guest={true}/>
            <div className={'orderInfo'}>
                <div className="orderInfo__topInfo">
                    <div className="orderInfo__left">
                        <div className="orderInfo__leftName">{orderData?.hotel}</div>
                        <div className="orderInfo__leftCountry">{orderData?.hotel_country}</div>
                    </div>
                    <div className="orderInfo__right">
                        <div className="orderInfo__rightName">К ОПЛАТЕ</div>
                        <div className="orderInfo__rightCountry">{orderData?.price && (orderData?.price).toLocaleString()} ₽</div>
                    </div>
                </div>
                <div className="orderInfo__bottomInfo">
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: 50}}>
                        {fields  &&
                            fields.map((item, key) => (
                                <div key={key} style={{width: '25%'}} className={'orderInfo__bottomField'}>
                                    <div className={'orderInfo__bottomInfoTitle'}>{item.placeholder[0].toUpperCase() + item.placeholder.slice(1)}</div>
                                    <div className={'orderInfo__bottomInfoValue'}>{item.key ? orderData.hasOwnProperty(item.key) ?  item.key === 'guests' ? (orderData[item.key]).length :orderData[item.key] : `` : ''}</div>

                                </div>

                            ))}
                    </div>

                </div>

            </div>
            <div className={'orderTitle'}>Паспортные данные</div>


            {orderData?.guests &&
                orderData?.guests.map((item, key) => (
                    <div key={key} className={'confirmGuest'}>
                        <div className={'orderTitle'} style={{
                            fontWeight: 600,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div className={'orderTitleRusName'}>{item.en_first_name} {item.en_second_name} {item.en_middle_name}</div>
                                <div className={'orderTitleEngName'}>{item.ru_first_name} {item.ru_second_name} {item.ru_middle_name}</div>
                            </div>
                            <DefaultButton {...{
                                text:  `${item?.confirmed ? 'Данные подтверждены':'Подтвердить'}`,
                                onClick: () => {handleInputChange(key, 'confirmed', true, item.id); },
                                height: 40,
                                style: {background: item?.confirmed ? '#878395': '#FF5104' }
                            }}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                            {guestFields &&
                                guestFields.map((item, key2) => (
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
                    onClick: () => redirectToPay(),
                    width: '100%',
                    height: 50,
                    // style: {marginTop: 50}
                    style: {background: '#FF5104', margin: '50px 0'}
                }}/>
            </div>

            <div style={{marginTop: 15, marginBottom:20, color: '#878395',display: 'flex',
                justifyContent: 'center'}}>
                Я принимаю условия <a href='assets/docs/oferta.pdf' target='_blank' style={{color: '#FF5104', paddingLeft: 5}}> оферты</a>
            </div>


        </div>
    )
}
