import React, { useEffect, useState } from 'react'
import conn from '../services/conn'

export default function UserData(props) {
    
    const [ analyst, setAnalyst ] = useState([])
    const idAnalyst = localStorage.getItem("@login-app/user")

    async function getAnalyst() {
       const response = await conn.get(`/securityanalyst/${idAnalyst}`)
       setAnalyst(response.data)
    }

    useEffect(() => {      
        getAnalyst()
    }, [])
    
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