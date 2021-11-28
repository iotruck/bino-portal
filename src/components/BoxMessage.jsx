import React, { useEffect, useState } from 'react';
import Message from '../components/Chat';
import conn from './../services/conn'

export default function BoxMessage(props) {
    const [contentMessage, setContentMessage] = useState("Hello World")

    function getDate() {
        let d = new Date()
        return d.toISOSstring()
    }

    const [messageBody, setMessageBody] = useState({
        content: contentMessage,
        dateTimeMessage: getDate(),
        sender: "string",
        travel: {
            id: 4
        }
    })

    const sendMessage = async (event) => {
        event.preventDefault();

        const postValue = {
            ...messageBody,
            dateTimeMessage: getDate()
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

    return (<div>
        <div>
            <h1>
                <p>
                    <span>{props.codeTravel}</span>
                </p>
            </h1>
        </div>
        {
            props.form ?
                <form className="send-message" onSubmit={sendMessage}>
                    <input type="text" name="content" value={messageBody.content} onChange={updateMessageValues} className="input-message" placeholder="Escreva sua mensagem aqui..." />

                    <button className="send-button">Enviar</button>
                </form> :
                ''
        }

    </div>
    )
}