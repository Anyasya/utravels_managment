import React, {useEffect, useState} from "react";
import {Header} from "../../components/header";
import {ClientCard} from "../../components/ClientCard";
import DefaultButton from "../../components/DefaultButton";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {deleteOrder, getOrderList} from "../../api/routes/client";

const SchemaTemplatePage = (props) => {

    const {} = props
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentCardId, setCurrentCardId] = useState();


    useEffect(() => {
        getOrderList().then(result => {
                setCards(result.data)
        })
    }, [])

    const handleModalOpen = () => {
        setIsOpen(!isOpen);
    };

    const deleteCard = () => {
        deleteOrder(currentCardId).then(result => {
            setCards((state) => state.filter((item) => item.id !== currentCardId))
            setCurrentCardId(null)
        })
    }

    const Modal = () => (
        <div className={'layout'}>
            <div className={'Modal'}>
                <div className="ModalContainer">
                    <div style={{marginBottom: 30}}>Вы уверены, что хотите удалить заявку?</div>
                    <div className={'ModalButtons'}>
                        <DefaultButton {...{
                            text: 'Отменить',
                            // loading,
                            onClick: () => handleModalOpen(),
                            // width: '100%',
                            height: 40,
                            style: {marginRight: 10, background: '#878395'}
                        }}/>
                        <DefaultButton {...{
                            text: 'Удалить',
                            // loading,
                            onClick: () => {
                                deleteCard();
                                handleModalOpen()
                            },
                            // width: '100%',
                            height: 40,
                            // style: {marginTop: 50}
                        }}/>
                    </div>
                </div>

            </div>

        </div>
    );


    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <Header/>
            <div className={'mainHeader'}
                 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                <div className={'mainHeader__title'}>Мои заказы</div>
                <DefaultButton {...{
                    text: 'Создать новый заказ',
                    // loading,
                    onClick: () => navigate('/order'),
                    // width: '100%',
                    height: 40,
                    // style: {marginTop: 50}
                }}/>
            </div>
            {cards && cards.length > 0 &&
                cards.map((item, key) => (
                    <div key={key}>
                        <ClientCard {...{item, isOpen, setIsOpen, handleModalOpen, setCurrentCardId}} />
                    </div>

                ))}
            {isOpen && <Modal/>}


        </div>
    )
}

export default SchemaTemplatePage


const CARDS = [
    {
        id: 1,
        paid: true,
        approved: true,
        name: '',
        price: 1234567,
        link: 'abc'
    },
    {
        id: 2,
        paid: false,
        approved: true,
        name: '',
        price: 1234567,
        link: 'abc2'
    },
    {
        id: 3,
        paid: false,
        approved: false,
        name: '',
        price: 1234567,
        link: 'abc3'
    }

]