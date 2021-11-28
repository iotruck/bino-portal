import React, { useEffect, useState } from 'react';
import conn from './../services/conn'

export default function InputMessage(props) {
    const [contentMessage, setContentMessage] = useState("")
    const [analyst, setAnalyst] = useState([])

    const idAnalyst = localStorage.getItem("@login-app/user")

    function getDate() {
        let d = new Date()
        return d.toISOString()
    }

    async function getAnalyst() {

        const response = await conn.get(`/securityanalyst/${idAnalyst}`)
        setAnalyst(response.data)

    }

    const [messageBody, setMessageBody] = useState({
        content: contentMessage,
        dateTimeMessage: getDate(),
        sender: analyst.name,
        travel: {
            id: 4
        }
    })

    const sendMessage = async (event) => {
        event.preventDefault();

        const postValue = {
            ...messageBody,
            dateTimeMessage: getDate(),
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
            [name]: value
        });
    };

    useEffect(() => {
        getAnalyst()
    })
    return (
        <form className="send-message" onSubmit={sendMessage}>
            <input type="text" name="content" value={messageBody.content} onChange={updateMessageValues} className="input-message" placeholder="Escreva sua mensagem aqui..." />

            <button className="send-button">Enviar</button>
        </form>
    )
}