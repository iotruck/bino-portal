import React, { useEffect, useState } from 'react';
import conn from './../services/conn'

export default function InputMessage(props) {
    const [contentMessage, setContentMessage] = useState("")
    const [analyst, setAnalyst] = useState([])
    const [idTravelMessage, setTravelMessage] = useState()

    const idAnalyst = localStorage.getItem("@login-app/user")

  

    async function getAnalyst() {

        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        setAnalyst(response.data)

    }

    const [messageBody, setMessageBody] = useState({
        content: contentMessage,
        sender: analyst.name,
        travel: {
            id: ""
        }
    })

    const sendMessage = async (event) => {
        event.preventDefault();

        const postValue = {
            ...messageBody,
            travel:{
                id: idTravelMessage
            },
            sender: analyst.name
        }

        const response = await conn.post(`/feed/message`, {
            ...postValue
        }).then(() => {
            window.location.reload();
        }).catch((err) => {
            console.log("Deu erro man");
        })
    }

    const updateMessageValues = (event) => {
        const { value, name } = event.target;
        setMessageBody({
            ...messageBody,
            travel:{
                id: idTravelMessage
            },
            [name]: value
        });
    };

    useEffect(() => {
        getAnalyst()
    }, [])
    return (
        <form className="send-message" onSubmit={sendMessage}>
            <input type="text" name="content" value={messageBody.content} onChange={updateMessageValues} className="input-message" placeholder="Escreva sua mensagem aqui..." />

            <button className="send-button" onClick={() => setTravelMessage(props.idTravel)}>Enviar</button>
        </form>
    )
}