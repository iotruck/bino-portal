import React, { useEffect, useState } from 'react';
import User from '../components/UserData';
import NotifyNotification from '../components/NotifyNotification';
import BoxMessage from '../components/BoxMessage';
import conn from './../services/conn'



export default function Notify(props) {
    const [travels, setTravel] = useState([])
    const [hasTravels, setHasTravels] = useState(false)
    const [selectedChat, setSelectedChat] = useState(false)
    const idAnalyst = localStorage.getItem("@login-app/user")

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`)
        setTravel(response.data)

        if (response.status === 204)
            setHasTravels(false)
        else
            setHasTravels(true)
    }

    useEffect(() => {
        getTravel()
    }, [])
    return (
        <React.Fragment>

            <h1 className="welcome">
                <p>
                    Notificações
                </p>
            </h1>
            <div className="background">
                <div className="left title">
                    <div>
                        <h1>
                            <p>
                                Viagens <span>ativas</span>
                            </p>
                        </h1>
                    </div>

                    {
                        hasTravels ?
                            travels.map((travel) => (
                                <NotifyNotification
                                    code={travel.codigo}
                                    date={travel.dateTravel}
                                    onClick={() => { setSelectedChat(true) }} />

                            )) :
                            <NotifyNotification code="Não há mensagens no momento" />
                    }

                </div>

                <hr className="line-dotted" />

                <div className="right title">
                    {
                        selectedChat ?
                            <BoxMessage
                                message="Selecione uma viagem para verificar a conversa"
                                form={false}
                            /> :
                            <BoxMessage
                                codeTravel="NOVSBS1280"
                                senderName="Sandra Cunha"
                                message="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                dateTime="20-11-2021"
                                form={true}
                            />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}