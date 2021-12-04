import React, { useEffect, useState } from 'react';
import User from '../components/UserData';
import NotifyNotification from '../components/NotifyNotification';
import BoxMessage from '../components/BoxMessage';
import Message from '../components/Chat';
import conn from './../services/conn'
import Input from '../components/InputMessage'



export default function Notify(props) {
    const [defaultTravelId, setDefaultTravelId] = useState("")
    const [travels, setTravel] = useState([])
    const [messages, setMessages] = useState([]);
    const [hasMessages, setHasMessages] = useState(false);
    const [hasTravels, setHasTravels] = useState(false)
    const [selectedChat, setSelectedChat] = useState(false)
    const [defaultTravel, setDefaultTravel] = useState("")
    const idAnalyst = localStorage.getItem("@login-app/user")


    async function getMessages() {
        const response = await conn.get(`/feed/message/${defaultTravelId}?qtd=0`)
        setMessages(response.data)
        console.log(messages)
        setHasMessages(response.status == 200 ? true : false)
    }

    async function getTravel() {
        const response = await conn.get(`/travel/analyst/${idAnalyst}`)
        setTravel(response.data)

        if (response.status === 204)
            setHasTravels(false)
        else
            setHasTravels(true)
    }

    function findTime(time) {
        let date = new Date(time)
        console.log(date)
        return date.toLocaleDateString('pt-BR')
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
                        {
                            hasTravels ?
                                travels.map((travel) => (
                                    <NotifyNotification
                                        code={travel.codigo}
                                        date={travel.dateTravel}
                                        onClick={
                                            () => {
                                                setSelectedChat(true);
                                                setDefaultTravelId(travel.id);
                                                setDefaultTravel(travel.codigo);
                                                getMessages();
                                            }
                                        }
                                    />
                                )) :
                                <NotifyNotification code="Não há mensagens no momento" />
                        }
                    </div>

                </div>

                <hr className="line-dotted" />

                <div className="right title">
                    {
                        selectedChat ?
                            <div className="feedBox">
                                <BoxMessage
                                    codeTravel={defaultTravel}
                                    form={true} />
                                <div className="box">
                                    {
                                        hasMessages ?
                                            messages.map((msg) => (
                                                <Message
                                                    senderName={msg.sender}
                                                    message={msg.content}
                                                    dateTime={msg.dateTimeMessage}
                                                />
                                            )) : <Message
                                                message="Esse é o começo da sua conversa nessa viagem"
                                            />
                                    }
                                </div>

                                <Input idTravel={defaultTravelId}/>
                            </div> :

                            <BoxMessage
                                codeTravel="Antes de tudo, selecione uma viagem"
                                form={false}
                            />

                    }
                </div>
            </div>
        </React.Fragment >
    )
}