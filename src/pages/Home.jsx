import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import User from '../components/UserData';
import Travel from '../components/ActivesTravels';
import Notification from '../components/Notifications';
import Chat from '../components/Chat';
import conn from './../services/conn'


import coruja from '../assets/img/coruja.png';
import blob from '../assets/img/blob.png';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("@login-app/user");
        history.push('/login')
    }

    const [analyst, setAnalyst] = useState([])
    const [travels, setTravel] = useState([])
    const [truckCount, setTruckCount] = useState([])
    const [truckerCount, setTruckerCount] = useState([])
    const [hasTravels, setHasTravels] = useState(false)
    const idAnalyst = localStorage.getItem("@login-app/user")
    const idCompany = localStorage.getItem("@login-app/company")

    async function getAnalyst() {

        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        setAnalyst(response.data)

    }

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`)
        setTravel(response.data)

        if (response.status === 204)
            setHasTravels(false)
        else
            setHasTravels(true)
    }


    async function countTruck() {
        const response = await conn.get(`/truck/score/${idCompany}`)
        setTruckCount(response.data)
    }

    async function countTrucker() {
        const response = await conn.get(`/trucker/score/${idCompany}`)
        setTruckerCount(response.data)
    }

    useEffect(() => {
        getAnalyst()
        getTravel()
        countTruck()
        countTrucker()
    }, [])

    return (

        <React.Fragment>
            <img src={blob} className="blob" alt="" />
            <h1 className="welcome">
                <img src={coruja} className="brand-logo" alt="Seja bem vindo, estamos aqui pra lha ajudar" />
                <p>
                    Olá, <span>{analyst.name}</span> <i className="fas fa-sign-out-alt" onClick={logout}></i>
                </p>
            </h1>

            <div className="active-travels">
                <p>
                    <h3>Viagens ativas</h3>
                    <Link to="/new-travel">
                        <i className="fas fa-reply"></i>
                    </Link>
                </p>
                <div id="active-travels-labels">
                    {

                        hasTravels ?
                            travels.map((travel) => (
                                <Travel date={travel.dateTravel} code={travel.codigo} truck={travel.truck.name} driver={travel.trucker.name} />
                            )) :
                            <Travel code="Não há viagens ativas" />
                    }
                </div>
            </div>

            <div className="registered-trucks">
                <p>
                    caminhões registrados
                    <b>
                        {truckCount}
                    </b>
                </p>
            </div>

            <div className="registered-drivers">
                <p>
                    caminhoneiros registrados
                    <b>
                        {truckerCount}
                    </b>
                </p>
            </div>

            <div className="notifications">
                <p>
                    <h3>Chats ativos</h3>
                    <Link to="/notify">
                        <i className="fas fa-reply"></i>
                    </Link>

                </p>

                {

                    hasTravels ?
                        travels.map((travel) => (
                            <Chat senderName={travel.codigo} dateTime={travel.dateTravel} />
                        )) :
                        <Chat senderName="Não há mensagens no momento" dateTime="" />

                }

                
            </div>

        </React.Fragment >
    );
}