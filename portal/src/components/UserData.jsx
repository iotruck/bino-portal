import React, { useEffect, useState } from 'react'
import conn from '../services/conn'

export default function UserData(props) {
    
    const [ analyst, setAnalyst ] = useState([])
    const idAnalyst = localStorage.getItem("@login-app/user")

    function getAnalyst() {
        conn.get(`/securityanalyst/${idAnalyst}`).then(response => {
            response.status === 200 ? setAnalyst(response.data) : console.log("No content");
        })
    }

    useEffect(() => {      
        getAnalyst()
    }, [ idAnalyst ])
    
    return (
        <div className="user">
            <div className="datas">
                <p className="name-user">{analyst.name}</p>
                <p className="account">Minha conta</p>
            </div>
            <div className="icon">
                <div className="icon-img">
                <div className="status"></div>
                </div>
                
            </div>
        </div>
    );
}