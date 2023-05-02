import DefaultButton from "./DefaultButton";
import React from "react";
import {useNavigate} from "react-router-dom";

export const ClientCard = ({item,handleModalOpen,setCurrentCardId}) => {
    const navigate = useNavigate()
    return (
        <div className={'ClientCard'}>
            <div className="ClientCard_statuses">
                <div className="status_approved" style={{color: item.approved ? '#04BA37' : '#FF0000'}}>
                    {item.approved ? 'Подтвержден' : 'Не подтвержден'}
                </div>
                <div className="status_paid" style={{color: item.paid ? '#04BA37' : '#FF0000'}}>
                    {item.paid ? 'Оплачен' : 'Не оплачен'}
                </div>
                <div className="status_edit" onClick={() => {
                    navigate('/order', {state: item.id})
                }}>
                    Редактировать
                </div>
                <div className="status_delete" onClick={()=>{setCurrentCardId(item.id);handleModalOpen()}}>
                    Удалить
                </div>
            </div>
            <div className="ClientCard_hotel">
                <div className="hotelName">
                    Anita Kemer Noch Adults Only 12+ 4*
                </div>
                <div className="hotelPrice">
                    23 490
                </div>
            </div>

            <DefaultButton {...{
                text: 'Ссылка клиенту',
                // loading,
                onClick: ()=>   navigate(`/auth/confirm/${item.id}`, {state: item.id}),
                // width: '100%',
                height: 40,
                style: {background: '#878395', marginTop: 'auto', minHeight: 40}
            }}/>

        </div>
    )
}