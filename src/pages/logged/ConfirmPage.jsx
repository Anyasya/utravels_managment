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
} from "../../api/routes/client";

export const ConfirmPage = () => {
    const [fields, setFields] = useState([])
    const [guestFields, setGuestFields] = useState([])
    const location = useLocation()
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
    }

    return (
        <div style={{width: '80%', margin: 'auto', maxWidth: 900}}>
            <Header guest={true}/>
            <div className={'orderInfo'}>
                <div className="orderInfo__topInfo">
                    <div className="orderInfo__left">
                        <div className="orderInfo__leftName">{orderData?.hotel}</div>
                        <div className="orderInfo__leftCountry">{`${orderData?.area_to}, ${orderData?.arrive_area}`}</div>
                    </div>
                    <div className="orderInfo__right">
                        <div className="orderInfo__rightName">К ОПЛАТЕ</div>
                        <div className="orderInfo__rightCountry">{orderData?.price && (orderData?.price).toLocaleString()} ₽</div>
                    </div>
                </div>
                <div className="orderInfo__bottomInfo">
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: 50}} className={'orderInfo__bottomInfoItem'} >
                        {fields  &&
                            fields.map((item, key) => (
                                item.key !== 'hotel' &&
                                item.key !== 'arrive_area' &&
                                item.key !== 'price' &&
                                <div key={key}  className={'orderInfo__bottomField'} className={'confirmGuestItem'}>
                                    <div className={'orderInfo__bottomInfoTitle'}>{(item.placeholder[0].toUpperCase() + item.placeholder.slice(1)).split('(ГГГГ-ММ-ДД)')[0]}</div>
                                    <div className={'orderInfo__bottomInfoValue'}>{item.key ? orderData.hasOwnProperty(item.key) ?  item.key === 'guests' ? (orderData[item.key]).length :orderData[item.key] : `` : ''}</div>

                                </div>

                            ))}
                    </div>

                </div>

            </div>
            <div className={'orderInfo2'}>
                <div className="orderInfo__bottomInfo">
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: 50}} className={'orderInfo__bottomInfoItem'} >
                        {fields  &&
                            fields.map((item, key) => (
                                item.key !== 'hotel' &&
                                item.key !== 'arrive_area' &&
                                item.key !== 'price' &&
                                <div key={key}  className={'orderInfo__bottomField'} className={'confirmGuestItem'}>
                                    <div className={'orderInfo__bottomInfoTitle'}>{(item.placeholder[0].toUpperCase() + item.placeholder.slice(1)).split('(ГГГГ-ММ-ДД)')[0]}</div>
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
                            alignItems: 'center',

                        }}>
                            <div>
                                <div className={'orderTitleRusName'}>{item.en_first_name.toUpperCase()} {item.en_second_name.toUpperCase()} {item.en_middle_name.toUpperCase()}</div>
                                <div className={'orderTitleEngName'}>{item.ru_first_name.toUpperCase()} {item.ru_second_name.toUpperCase()} {item.ru_middle_name.toUpperCase()}</div>
                            </div>
                            <DefaultButton {...{
                                text:  `${item?.confirmed ? 'Данные подтверждены':'Подтвердить данные'}`,
                                onClick: () => {handleInputChange(key, 'confirmed', true, item.id); },
                                height: 40,
                                style: {background: item?.confirmed ? '#878395': '#FF5104',position: 'relative',
                                    top: '-14px' }
                            }}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: -50}} className={'confirmGuestContent'}>
                            <div style={{ marginBottom: 20}} className={'confirmGuestItem'}>
                                <div className={'confirmGuestTitle'}>Дата рождения</div>
                                <div className={'confirmGuestValue'}>{item.birth_date}</div>
                            </div>
                            <div style={{ marginBottom: 20}} className={'confirmGuestItem'}>
                                <div className={'confirmGuestTitle'}>Гражданство</div>
                                <div className={'confirmGuestValue'}>{item.citizenship}</div>
                            </div>
                            <div style={{ marginBottom: 20}} className={'confirmGuestItem'}>
                                <div className={'confirmGuestTitle'}>Тип документа</div>
                                <div className={'confirmGuestValue'}>{item.document_type}</div>
                            </div>
                            <div style={{ marginBottom: 20}} className={'confirmGuestItem'}>
                                <div className={'confirmGuestTitle'}></div>
                                <div className={'confirmGuestValue'}></div>
                            </div>
                            {guestFields &&
                                guestFields.map((item, key2) => (
                                    item.key !== 'document_type' &&
                                    item.key !== 'birth_date' &&
                                    item.key !== 'citizenship' &&
                                    item.key !== 'en_first_name' &&
                                    item.key !== 'en_middle_name' &&
                                    item.key !== 'en_second_name' &&
                                    item.key !== 'ru_first_name' &&
                                    item.key !== 'ru_middle_name' &&
                                    item.key !== 'ru_second_name' &&
                                    <div key={key2} style={{ marginBottom: 20}} className={'confirmGuestItem'}>
                                        <div className={'confirmGuestTitle'}>{(item.placeholder[0].toUpperCase() + item.placeholder.slice(1)).split('(ГГГГ-ММ-ДД)')[0]}</div>
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

            <div style={{marginTop: 15, marginBottom:20, color: '#878395',display: 'flex', justifyContent: 'center'}} className={'link-oferta'}>
                Я принимаю условия <a href='https://utravels.ru/oferta.pdf' target='_blank' style={{color: '#FF5104', paddingLeft: 5}}> оферты</a>
            </div>


        </div>
    )
}
