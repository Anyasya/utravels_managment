import DefaultButton from "./DefaultButton";
import React from "react";
import logo from '../assets/images/logo.svg'
import {useNavigate} from "react-router-dom";

export const Header = ({guest}) =>{
    const navigate = useNavigate()

    function logOutUser() {
        localStorage.clear();
        navigate('/auth/sign-in')

    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px 0', marginBottom: 20}}>
            <img src={logo} onClick={()=>navigate('/')} style={{cursor: "pointer"}}/>
            {
                !guest &&
                <DefaultButton {...{
                    text: 'Выйти',
                    // loading,
                    onClick: ()=> logOutUser(),
                    // width: '100%',
                    height: 40,
                    // style: {marginTop: 50}
                }}/>

            }



        </div>
    )
}