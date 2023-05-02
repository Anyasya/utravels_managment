import React, { useState } from "react";

const Modal = () => (
    <div className={'layout'}>
        <div className={'Modal'}>
            Вы уверены, что хотите удалить заявку?
        </div>

    </div>
);

const ModalOpen = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button onClick={handleModalOpen}>Open Modal</button>
            {isOpen && <Modal />}
        </>
    );
};

export default ModalOpen;