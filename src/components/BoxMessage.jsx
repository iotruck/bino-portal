import React, { useEffect, useState } from 'react';
import Message from '../components/Chat';

export default function BoxMessage(props) {
    return (<div>
        <div>
            <h1>
                <p>
                    <span>{props.codeTravel}</span>
                </p>
            </h1>
        </div>
        <div className="box">


            <Message
                senderName={props.senderName}
                message={props.message}
                dateTime={props.dateTime}
            />

        </div>
        {
            props.form ?
                <form action="#" className="send-message">
                    <input type="text" className="input-message" placeholder="Escreva sua mensagem aqui..." />
                    <i className="fas fa-chevron-right"></i>
                </form> :
                ''
        }

    </div>
    )
}